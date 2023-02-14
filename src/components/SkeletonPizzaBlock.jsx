import React from "react"
import ContentLoader from "react-content-loader"

const SkeletonPizzaBlock = (props) => (
    <ContentLoader
        className={'pizza-block'}
        speed={2}
        width={280}
        height={467}
        viewBox="0 0 280 467"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
      <circle cx="150" cy="123" r="123"/>
      <rect x="0" y="267" rx="5" ry="5" width="280" height="27"/>
      <rect x="-1" y="313" rx="9" ry="9" width="280" height="87"/>
      <rect x="2" y="431" rx="5" ry="5" width="91" height="25"/>
      <rect x="126" y="421" rx="23" ry="23" width="155" height="47"/>
    </ContentLoader>
)

export default SkeletonPizzaBlock;