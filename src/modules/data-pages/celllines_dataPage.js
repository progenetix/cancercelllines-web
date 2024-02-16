import React from "react"
import { Layout } from "../../components/Layout"
import parametersConfig from "../../config/beaconSearchParameters.yaml"
import beaconQueryTypes from  "../../config/beaconQueryTypes.yaml"
import requestTypeExamples from "../../config/celllines_searchExamples.yaml"
import BiosamplesSearchPanel from "../../components/searchForm/BiosamplesSearchPanel"

export default function cellLines_dataPage({ cytoBands }) {
  return (
    <Layout title="Cancer Cell Lines" headline="Cancer Cell Lines">
      <BiosamplesSearchPanel
        cytoBands={cytoBands}
        parametersConfig={parametersConfig}
        beaconQueryTypes={beaconQueryTypes}
        requestTypeExamples={requestTypeExamples}
        collapsed={false}
      />
    </Layout>
  )
}
