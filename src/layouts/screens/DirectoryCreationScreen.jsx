import React from "react"
import axios from "axios"
import PropTypes from "prop-types"
import * as _ from "lodash"

import { useParams } from "react-router-dom"

import {
  useGetDirectoryHook,
  useCreateDirectoryHook,
} from "../../hooks/directoryHooks"

import DirectoryCreationModal from "../../components/DirectoryCreationModal"

// axios settings
axios.defaults.withCredentials = true

export const DirectoryCreationScreen = ({ onClose }) => {
  const params = useParams()

  const { data: dirData } = useGetDirectoryHook(params, { initialData: [] })
  const { mutateAsync: saveHandler } = useCreateDirectoryHook(params)

  return (
    <DirectoryCreationModal
      dirData={dirData}
      params={params}
      onProceed={saveHandler}
      onClose={onClose}
    />
  )
}

DirectoryCreationScreen.propTypes = {
  onClose: PropTypes.func.isRequired,
}