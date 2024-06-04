import { Button, Row } from "antd";
import React, { ReactNode, forwardRef } from "react";

type button = {
  label?: string;
  size?: string;
  icon?: React.ReactNode;
  action?: any;
  type?: string;
  className?: string;
};

type Props = {
  title: string | ReactNode;
  buttons?: button[];
  customButton?: ReactNode;
  customSlect?: ReactNode;
};

export const HeaderPage = forwardRef(({ title, buttons, customButton, customSlect }: Props, ref) => {
  return (

    <Row ref={ref} className="flex flex-wrap justify-between items-center px-0 py-5 flex-nowrap">
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
              icon={button?.label ? button.icon : false}
              onClick={button.action}
              type={button.type}
            >
              {button?.label ? button?.label : button.icon}
            </Button>
          ))}
        {customSlect}
        {customButton}
      </div>
    </Row>

  );
})
