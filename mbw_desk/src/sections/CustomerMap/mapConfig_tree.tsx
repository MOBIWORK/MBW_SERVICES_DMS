import React, { useState } from 'react';
import { Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';

interface MapConfigTreeProps {
    mapConfig: any[];
    onCheck: (checkedKeys: React.Key[]) => void; // Thêm onCheck vào prop types
  }

const MapConfigTree: React.FC<MapConfigTreeProps> = ({ mapConfig, onCheck }) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const generateTreeData = (data: any[]): TreeDataNode[] =>
    data.map((item) => ({
      title: item.label,
      key: item.id,
      children: item.children ? generateTreeData(item.children) : undefined,
    }));

  const treeData: TreeDataNode[] = generateTreeData(mapConfig);

  const onExpand: TreeProps['onExpand'] = (expandedKeysValue) => {
    console.log('onExpand', expandedKeysValue);
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheckHandler: TreeProps['onCheck'] = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue as React.Key[]);
    // Gọi hàm onCheck từ props
    onCheck(checkedKeysValue);
  };


  const onSelect: TreeProps['onSelect'] = (selectedKeysValue, info) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  return (
    <Tree
      checkable
      onExpand={onExpand}
      expandedKeys={expandedKeys}
      autoExpandParent={autoExpandParent}
      onCheck={onCheckHandler} 
      checkedKeys={checkedKeys}
      onSelect={onSelect}
      selectedKeys={selectedKeys}
      treeData={treeData}
    />
  );
};

export default MapConfigTree;
