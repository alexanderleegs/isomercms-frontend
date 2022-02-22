import PropTypes from "prop-types"
import React from "react"

import FormField from "components/FormField"
import { CardContainer } from "components/CardContainer"
import { useFormContext } from "react-hook-form"
import elementStyles from "styles/isomer-cms/Elements.module.scss"

import _ from "lodash"

export const EditorResourcesSection = ({
  fieldId, // sections.[sectionIndex].resources
  deleteHandler,
}) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext()
  const sectionErrors = _.get(errors, fieldId)

  return (
    <CardContainer
      cardTitle={`Resources section: ${watch("title")}`}
      isError={!_.isEmpty(sectionErrors)}
    >
      <div className={elementStyles.cardContent}>
        <FormField
          register={register}
          title="Resources section subtitle"
          id={`${fieldId}.subtitle`}
          errorMessage={sectionErrors?.subtitle?.message}
          isRequired
        />
        <FormField
          register={register}
          title="Resources section title"
          id={`${fieldId}.title`}
          errorMessage={sectionErrors?.title?.message}
          isRequired
        />
        <FormField
          register={register}
          title="Resources button name"
          id={`${fieldId}.button`}
          errorMessage={sectionErrors?.button?.message}
          isRequired
        />
      </div>
      <div className={elementStyles.inputGroup}>
        <button
          type="button"
          id={`${fieldId}-delete`}
          className={`ml-auto ${elementStyles.warning}`}
          onClick={deleteHandler}
        >
          Delete section
        </button>
      </div>
    </CardContainer>
  )
}

export default EditorResourcesSection

EditorResourcesSection.propTypes = {
  sectionContent: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    button: PropTypes.string,
  }),
  sectionIndex: PropTypes.number.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
}
