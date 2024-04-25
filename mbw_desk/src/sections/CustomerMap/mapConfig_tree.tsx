import React, { useEffect, useState } from 'react';
import { Slider, Tree } from 'antd';
import type { SliderSingleProps, TreeDataNode, TreeProps } from 'antd';
import { AxiosService } from '@/services/server';
import { SettingFilled } from '@ant-design/icons';

interface MapConfigTreeProps {
  onCheck: (checkedKeys: React.Key[]) => void;
  onMoveLayer: (layerIds: React.Key,beforeIds: React.Key) => void;
}

const MapConfigTree: React.FC<MapConfigTreeProps> = ({ onCheck, onMoveLayer }) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [mapConfig, setMapConfig] = useState<TreeDataNode[]>([]);
  const formatter: NonNullable<SliderSingleProps['tooltip']>['formatter'] = (value) => `${value}%`;
  const [showLegend, setShowLegend] = useState<boolean[]>([]);
  const handleLegendToggle = (index: number) => {
    setShowLegend(prevShowLegend => {
      const newShowLegend = [...prevShowLegend]; 
      newShowLegend[index] = !newShowLegend[index]; 
      return newShowLegend;
    });
  };
  const generateTreeData = (data: any[]): TreeDataNode[] =>
    data.map((item, index) => ({
      title: item.children ? (
        <span>{item.label}</span>
      ) : (
       <>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{item.label}</span>
          <SettingFilled style={{margin: '0 5px'}} onClick={()=>handleLegendToggle(index)}/>
        </div>
        {showLegend[index] && (
            <>
             <div>
             <span>Chú giải</span><br/>
             <img src={item.legend} alt="legend" />
             </div>
             <div>
              <span>Độ mờ</span>
              <Slider tooltip={{ formatter }} />
             </div>
            </>
          )}
        </>
      ),
      key: item.id,
      children: item.children ? generateTreeData(item.children) : [],
    }));

  const getConfigMap = async () => {
    let res = await AxiosService.get(
      "/api/method/mbw_dms.api.vgm.map_customer.get_config_map"
    );
    let dataMapConfig = generateTreeData(res.result)
    setMapConfig(dataMapConfig);
  };

  useEffect(()=>{
    getConfigMap();
  },[showLegend])

  const onExpand: TreeProps['onExpand'] = (expandedKeysValue) => {
    console.log('onExpand', expandedKeysValue);
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheckHandler: TreeProps['onCheck'] = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue as React.Key[]);
    onCheck(checkedKeysValue);
  };


  const onSelect: TreeProps['onSelect'] = (selectedKeysValue, info) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };
  const onDragEnter: TreeProps['onDragEnter'] = (info) => {
    console.log('onDragEnter:', info);
  };

  const onDrop: TreeProps['onDrop'] = (info) => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    const dragPos = info.dragNode.pos.split('-');
    if (dropPos.length === dragPos.length){
      const loop = (
        data: TreeDataNode[],
        key: React.Key,
        callback: (node: TreeDataNode, i: number, data: TreeDataNode[]) => void
      ) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].key === key) {
            return callback(data[i], i, data);
          }
          if (data[i].children) {
            loop(data[i].children!, key, callback);
          }
        }
      };
    
      const data = [...mapConfig];
    
      let dragObj: TreeDataNode;
    
      loop(data, dragKey, (item, index, arr) => {
        arr.splice(index, 1);
        dragObj = item;
      });
    
      if (!info.dropToGap) {
        loop(data, dropKey, (item) => {
          item.children = item.children || [];
          item.children.unshift(dragObj);
        });
      } else {
        let ar: TreeDataNode[] = [];
        let i: number;
        loop(data, dropKey, (_item, index, arr) => {
          ar = arr;
          i = index;
        });
        if (dropPosition === -1) {
          ar.splice(i!, 0, dragObj!);
        } else {
          ar.splice(i! + 1, 0, dragObj!);
        }
      }
      setMapConfig(data)
      const layerIds = dragKey; 
      const beforeId = info.dropToGap ? dropKey : undefined;
      if (beforeId !== undefined) {
        onMoveLayer(layerIds, beforeId);
    } 
    }else{
      return;
    }
    
  };
  
  return (
    <Tree
      className="draggable-tree"
      draggable
      blockNode
      checkable
      onExpand={onExpand}
      expandedKeys={expandedKeys}
      autoExpandParent={autoExpandParent}
      onCheck={onCheckHandler}
      checkedKeys={checkedKeys}
      onSelect={onSelect}
      selectedKeys={selectedKeys}
      onDragEnter={onDragEnter}
      onDrop={onDrop}
      treeData={mapConfig}
    />
  );
};

export default MapConfigTree;
