import React from 'react';
import Helmet from 'react-helmet';
import { observer, inject } from 'mobx-react';
import * as PropTypes from 'prop-types';
import TemplateWrapper from '../components/layout';

@inject('Store')
@observer
class EnLayout extends React.Component {
  constructor(props) {
    super(props);
    this.props.Store.setTitle('Gatsby Contentful TailwindCSS Mobx Starter');
  }

  render() {
    const content = this.props.data.allContentfulLayout.edges;
    return (
      <TemplateWrapper location={this.props.location}>
        <h1 className="text-purple-dark">Home</h1>
        <div className="flex flex-wrap items-stretch justify-around">
          {content.map(({ node }) =>
            node.contentModules.map(({ course }) => (
              <div
                className="max-w-sm rounded overflow-hidden shadow-lg my-4"
                key={course.id}
              >
                <Helmet title={course.title} />
                <div className="px-6 py-4">
                  <img
                    className="w-full"
                    src={course.image.resolutions.src}
                    alt={course.image.title}
                  />
                  <h2 className="font-bold text-xl mb-2">
                    {course.title} ({course.node_locale})
                  </h2>
                  <div
                    className="text-grey-dark leading-normal tracking-normal text-base"
                    dangerouslySetInnerHTML={{
                      __html: course.description.childMarkdownRemark.html,
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </TemplateWrapper>
    );
  }
}

EnLayout.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  Store: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default EnLayout;

export const enquery = graphql`
  query enContentQuery {
    allContentfulLayout(filter: { node_locale: { eq: "en-US" } }) {
      edges {
        node {
          slug
          title
          node_locale
          contentModules {
            course {
              id
              title
              shortDescription
              node_locale
              image {
                id
                title
                resolutions {
                  src
                  width
                  height
                }
              }
              description {
                description
                childMarkdownRemark {
                  excerpt
                  html
                }
              }
            }
          }
        }
      }
    }
  }
`;
