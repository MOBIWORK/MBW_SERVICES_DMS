import { Button, Row } from "antd";
import React, { ReactNode } from "react";

type button = {
  label: string;
  size?: string;
  icon?: React.ReactNode;
  action?: any;
  type?: string;
  className?: string;
};

type Props = {
  title: string;
  buttons?: button[];
  customButton ?: ReactNode
};

export function HeaderPage({ title, buttons ,customButton}: Props) {
  return (
    <>
      <Row className="flex flex-wrap justify-between items-center px-0 py-5 flex-nowrap">
        <div className="flex justify-center items-center">
          <span className="text-2xl font-semibold leading-[21px] ml-2">{title}</span>
        </div>
        <div className="flex mb-2 flex-nowrap">
          {buttons &&
            buttons.map((button, index) => (
              <Button
                key={index}
                className={button.className}
                size={button.size || "middle"}
                icon={button.icon}
                onClick={button.action}
                type={button.type}
              >
                {button.label}
              </Button>
            ))}
            {customButton}
        </div>
      </Row>
    </>
  );
}
