import React, { useState } from "react"
import { SubsetsTree } from "./SubsetsTree"
import { sortBy } from "lodash"
import { getOrMakeChild, getOrMakeNode } from "./tree"

export function TreePanel({
  tree,
  size,
  subsetById,
  datasetIds,
  sampleFilterScope,
  defaultTreeDepth,
  isFlat
}) {
  const [checkedIds, setCheckedIds] = useState({})
  const checkboxClicked = ({ checked, id }) => {
    if (checked) {
      setCheckedIds({ ...checkedIds, [id]: true })
    } else {
      const { [id]: omit, ...otherChecked } = checkedIds
      setCheckedIds(otherChecked)
    }
  }
  const checkedSubsets = Object.entries(checkedIds).map(([id]) => {
    return subsetById[id]
  })
  return (
    <>
      <div className="Subsets__tree">
        <SubsetsTree
          tree={tree}
          size={size}
          datasetIds={datasetIds}
          checkedSubsets={checkedSubsets}
          checkboxClicked={checkboxClicked}
          sampleFilterScope={sampleFilterScope}
          defaultTreeDepth={defaultTreeDepth}
          isFlat={isFlat}
        />
      </div>
    </>
  )
}

export function buildTree(response, subsetById) {
  const hierarchyPaths = response.flatMap((subset) => subset.hierarchyPaths)
  const sortedHierarchyPaths = sortBy(hierarchyPaths, [
    (p) => Number.parseInt(p.order)
  ])
  // add an arbitrary root
  const tree = { id: "root", children: [], path: ["root"] }
  let size = 1
  for (const hierarchy of sortedHierarchyPaths) {
    if (hierarchy.path) {
      const path = hierarchy.path.filter((p) => !!p)
      const fullPath = ["root", ...path]
      const node = getOrMakeNode(tree, fullPath, randomStringGenerator)
      node.subset = subsetById[node.id]
      node.subset.order = Number.parseInt(hierarchy.order)
      size++
    }
  }
  return { tree, size }
}

export function buildTreeForDetails(response, subsetById) {
  const rootSubset = response[0]
  const tree = { id: "root", children: [], path: ["root"] }
  let size = 1
  const rootNode = getOrMakeChild(tree, rootSubset.id)
  rootNode.subset = rootSubset
  const childTerms = rootSubset.childTerms
  childTerms.forEach((c) => {
    // some subsets have themselves in the children list
    if (rootSubset.code !== c) {
      const node = getOrMakeChild(rootNode, c, randomStringGenerator)
      node.subset = subsetById[node.id]
      size++
    }
  })
  return { tree, size }
}

// We generate random UID because a tree contains several nodes with the same ids
const randomStringGenerator = () => Math.random().toString(36).substring(2, 15)
