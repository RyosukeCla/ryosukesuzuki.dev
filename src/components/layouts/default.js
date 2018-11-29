import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql, Link, withPrefix } from 'gatsby'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => {
      const logoStyle = {
        height: '30px',
        width: 'auto',
      }
      const iconStyle = {
        height: '20px',
        width: '20px',
      }

      const Icon = ({ src, href = '/', last = false }) => {
        const className = `uk-navbar-item ${
          last ? 'uk-padding-remove-left' : 'uk-padding-remove-horizontal'
        }`
        return (
          <li className={className}>
            <a href={href}>
              <img
                className="navbar-icon"
                src={withPrefix(src)}
                style={iconStyle}
              />
            </a>
          </li>
        )
      }

      return (
        <>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              { name: 'description', content: 'Ryosuke Suzuki' },
              { name: 'keywords', content: 'Portfolio' },
            ]}
          >
            <html lang="en" />
          </Helmet>
          <nav className="uk-navbar-container uk-navbar uk-navbar-transparent">
            <div className="uk-navbar-left">
              <ul className="uk-navbar-nav">
                <li className="uk-active uk-navbar-item uk-logo">
                  <Link to="/">
                    <img
                      className="uk-margin-small-right"
                      src={withPrefix('svg/rs.svg')}
                      alt={data.site.siteMetadata.title}
                      style={logoStyle}
                    />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="uk-navbar-right">
              <ul className="uk-navbar-nav">
                <Icon
                  src="svg/twitter.svg"
                  href="https://twitter.com/GentleClarinet"
                />
                <Icon
                  src="svg/github.svg"
                  href="https://github.com/RyosukeCla"
                />
                <Icon
                  src="svg/facebook.svg"
                  last="true"
                  href="https://www.facebook.com/ryosuke0907"
                />
              </ul>
            </div>
          </nav>
          <div className="uk-container">{children}</div>
        </>
      )
    }}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
