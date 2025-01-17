import { sanitizeUrl } from "@braintree/sanitize-url"
import DOMPurify from "dompurify"
import PropTypes from "prop-types"
import { forwardRef } from "react"

const Contact = forwardRef(({ contact }, ref) => (
  <div className="col is-6" ref={ref}>
    <p className="has-text-weight-semibold margin--top--none margin--bottom--none">
      {contact.title}
    </p>
    {contact.content.map((d) => {
      const key = Object.keys(d)[0]
      switch (key) {
        case "phone": {
          return (
            <p className="margin--top--none margin--bottom--none">
              <a
                href={sanitizeUrl(`tel:${d[key].replace(/\s/g, "")}`)}
                onClick={(event) => event.preventDefault()}
              >
                <u>{d[key]}</u>
              </a>
            </p>
          )
        }
        case "email": {
          return (
            <p className="margin--top--none margin--bottom--none">
              <a
                href={sanitizeUrl(`mailto:${d[key]}`)}
                onClick={(event) => event.preventDefault()}
              >
                <u>{d[key]}</u>
              </a>
            </p>
          )
        }
        default: {
          // others
          return (
            /* TODO: CSP validation should be done on html elements before rendering */
            <div
              dangerouslySetInnerHTML={{
                __html: `<p className="margin--top--none margin--bottom--none">${DOMPurify.sanitize(
                  d[key]
                )}</p>`,
              }}
            />
          )
        }
      }
    })}
  </div>
))

const TemplateContactsSection = forwardRef(({ contacts, scrollRefs }, ref) => (
  <div ref={ref}>
    {contacts && contacts.length ? (
      <div className="row is-multiline margin--bottom--xl">
        <div className="col is-12 padding--bottom--none">
          <h5 className="has-text-secondary">
            <b>Contact Us</b>
          </h5>
        </div>
        {contacts.map((contact, i) => (
          <Contact contact={contact} ref={scrollRefs[i]} />
        ))}
      </div>
    ) : null}
  </div>
))

Contact.propTypes = {
  title: PropTypes.string,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      phone: PropTypes.string,
    }),
    PropTypes.shape({
      email: PropTypes.string,
    }),
    PropTypes.shape({
      other: PropTypes.string,
    })
  ),
}

TemplateContactsSection.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.arrayOf(
        PropTypes.shape({
          phone: PropTypes.string,
        }),
        PropTypes.shape({
          email: PropTypes.string,
        }),
        PropTypes.shape({
          other: PropTypes.string,
        })
      ),
    })
  ),
}

export default TemplateContactsSection
