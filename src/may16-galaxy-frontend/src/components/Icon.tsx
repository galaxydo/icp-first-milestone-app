// import { Icon as IconComp, IconProps } from "@iconify/react";

import { IconProps } from "@iconify/react";
import { iconToSVG, iconToHTML } from "@iconify/utils";

const Icon = (props: IconProps) => {
  if (!props.icon) return <></>;
  
  const renderData = iconToSVG(props.icon);

  if (!renderData.body) return <></>;

  const html = iconToHTML(renderData.body, {
    ...renderData.attributes,
    'font-size': props.fontSize,
    'class': props.className ? props.className : ''
  })

  console.log(html)

  // return <IconComp {...props}></IconComp>;
  return <span class={props.hidden ? "hidden" : ""} dangerouslySetInnerHTML={{
    __html: html,
  }}></span>
};

export default Icon;
