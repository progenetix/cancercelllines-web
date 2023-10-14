import React from "react"
import { Layout } from "../../components/Layout"
import parametersConfig from "../../config//searchParameters.yaml"
import requestTypeConfig from "../../config/celllines_searchParameters.yaml"
import requestTypeExamples from "../../config/celllines_searchExamples.yaml"
import BiosamplesSearchPanel from "../../components/searchForm/BiosamplesSearchPanel"

export default function cellLines_dataPage({ cytoBands }) {

  return (
    <Layout title="Cancer Cell Lines" headline="Cancer Cell Lines">
{/*      <div className="notification is-warning">
        The <i>Cancer Cell Lines</i> site is under development. <b>Stay tuned!</b>
      </div>
*/}   
      <BiosamplesSearchPanel
        parametersConfig={parametersConfig}
        requestTypeConfig={requestTypeConfig}
        requestTypeExamples={requestTypeExamples}
        cytoBands={cytoBands}
        collapsed={false}
      />
    </Layout>
  )
}
