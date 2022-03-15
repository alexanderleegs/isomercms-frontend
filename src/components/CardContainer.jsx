import React, { useState } from "react"

import elementStyles from "styles/isomer-cms/Elements.module.scss"

export const CardContainer = ({
  id,
  cardTitle,
  children,
  isError,
}) => {
  const [shouldDisplay, setShouldDisplay] = useState(false)

  return (
    <div
      className={`${elementStyles.card} ${
        !shouldDisplay && isError ? elementStyles.error : ""
      }`}
    >
      <div className={elementStyles.cardHeader}>
        <h2>{cardTitle}</h2>
        <button
          id={id}
          type="button"
          onClick={() => setShouldDisplay(!shouldDisplay)}
        >
          <i
            className={`bx ${
              shouldDisplay ? "bx-chevron-down" : "bx-chevron-right"
            }`}
          />
        </button>
      </div>
      {shouldDisplay && <>{children}</>}
    </div>
  )
}
