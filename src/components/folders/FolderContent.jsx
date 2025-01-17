import { IconButton } from "@opengovsg/design-system-react"
import { MenuDropdown } from "components/MenuDropdown"
import { useState, useRef } from "react"
import { Link, useRouteMatch } from "react-router-dom"

import useRedirectHook from "hooks/useRedirectHook"

import elementStyles from "styles/isomer-cms/Elements.module.scss"
import contentStyles from "styles/isomer-cms/pages/Content.module.scss"

import { pageFileNameToTitle } from "utils"

// Import styles

const FolderItem = ({ item, itemIndex, isDisabled }) => {
  const { url } = useRouteMatch()
  const { setRedirectToPage } = useRedirectHook()

  const { name, type, children } = item
  const dropdownRef = useRef(null)
  const [showDropdown, setShowDropdown] = useState(false)

  const generateLink = () => {
    const encodedName = encodeURIComponent(name)
    return type === "dir"
      ? `${url}/subfolders/${encodedName}`
      : `${url}/editPage/${encodedName}`
  }

  const generateDropdownItems = () => {
    const encodedName = encodeURIComponent(name)
    const dropdownItems = [
      {
        type: "edit",
        handler: () => {
          if (type === "dir") {
            setRedirectToPage(`${url}/editDirectorySettings/${encodedName}`)
          } else {
            setRedirectToPage(`${url}/editPageSettings/${encodedName}`)
          }
        },
      },
      {
        type: "move",
        handler: () => setRedirectToPage(`${url}/movePage/${encodedName}`),
      },
      {
        type: "delete",
        handler: () => {
          if (type === "dir") {
            setRedirectToPage(`${url}/deleteDirectory/${encodedName}`)
          } else {
            setRedirectToPage(`${url}/deletePage/${encodedName}`)
          }
        },
      },
    ]
    if (type === "file") return dropdownItems
    return dropdownItems.filter((dropdownItem) => dropdownItem.type !== "move")
  }

  return (
    <Link
      className={`${contentStyles.component} ${contentStyles.card}`}
      to={!isDisabled && generateLink(item, url)}
    >
      <div
        type="button"
        className={`${elementStyles.card} ${contentStyles.card} ${elementStyles.folderItem}`}
      >
        <div className={contentStyles.contentContainerFolderRow}>
          {type === "file" ? (
            <i
              className={`bx bxs-file-blank ${elementStyles.folderItemIcon}`}
            />
          ) : (
            <i className={`bx bxs-folder ${elementStyles.folderItemIcon}`} />
          )}
          <span className={`${elementStyles.folderItemText} mr-auto`}>
            {pageFileNameToTitle(name)}
          </span>
          {children ? (
            <span className={`${elementStyles.folderItemText} mr-5`}>
              {children.length} item{children.length === 1 ? "" : "s"}
            </span>
          ) : null}
          {!isDisabled && (
            <div className="position-relative mt-auto mb-auto">
              <IconButton
                id={`folderItem-dropdown-${name}`}
                variant="clear"
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  setShowDropdown((prevState) => !prevState)
                }}
                onBlur={() => setShowDropdown(false)}
              >
                <i className="bx bx-dots-vertical-rounded" />
              </IconButton>
              {showDropdown && (
                <MenuDropdown
                  menuIndex={itemIndex}
                  dropdownItems={generateDropdownItems(item, url)}
                  dropdownRef={dropdownRef}
                  onBlur={() => setShowDropdown(false)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

const FolderContent = ({ dirData }) => {
  const InnerContent = () => {
    if (dirData && dirData.length) {
      return dirData.map((item) => <FolderItem key={item.name} item={item} />)
    }

    if (dirData) {
      return (
        <span className="d-flex justify-content-center">
          No pages here yet.
        </span>
      )
    }

    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status" />
      </div>
    )
  }

  return (
    <div className={`${contentStyles.contentContainerFolderColumn} mb-5`}>
      <InnerContent />
    </div>
  )
}

export { FolderContent, FolderItem }
