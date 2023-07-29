import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={290}
    height={500}
    viewBox="0 0 290 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="140" cy="116" r="116" /> 
    <rect x="0" y="241" rx="10" ry="10" width="280" height="27" /> 
    <rect x="0" y="295" rx="15" ry="15" width="280" height="88" /> 
    <rect x="0" y="399" rx="10" ry="10" width="116" height="35" /> 
    <rect x="137" y="397" rx="25" ry="25" width="150" height="43" />
  </ContentLoader>
)

export default Skeleton

