import * as React from "react";
import Story from "./Story";
import { graphql, useLazyLoadQuery, usePaginationFragment } from "react-relay";
import { NewsfeedQuery as NewsfeedQueryType } from "./__generated__/NewsfeedQuery.graphql";
import type { NewsfeedContentsFragment$key } from "./__generated__/NewsfeedContentsFragment.graphql";
import InfiniteScrollTrigger from "./InfiniteScrollTrigger";

const NewsfeedQuery = graphql`
  query NewsfeedQuery {
    ...NewsfeedContentsFragment
  }
`;

const NewsfeedContentsFragment = graphql`
  fragment NewsfeedContentsFragment on Query
    @argumentDefinitions (
      cursor: { type: "String" }
      count: { type: "Int", defaultValue: 3 }
    )
    @refetchable(queryName: "NewsfeedContentsRefetchQuery")
  {
    viewer {
      newsfeedStories(after: $cursor, first: $count)
        @connection(key: "NewsfeedContentsFragment_newsfeedStories")
      {
        edges {
          node {
            id
            ...StoryFragment
          }
        }
      }
    }
  }
`;

export default function Newsfeed() {
  const queryData = useLazyLoadQuery<NewsfeedQueryType>(NewsfeedQuery, {});

  return (
    <div className="newsfeed">
      <NewsfeedContents viewer={queryData} />
    </div>
  )
}

type Props = {
  viewer: NewsfeedContentsFragment$key;
};

const NewsfeedContents = ({viewer}: Props) => {
  const {data, loadNext, hasNext, isLoadingNext} = usePaginationFragment(NewsfeedContentsFragment, viewer);
  const storyEdges = data.viewer.newsfeedStories.edges;

  const onEndReached = React.useCallback(() => {loadNext(3)}, [loadNext]);

  return (
    <>
      {storyEdges.map(storyEdge => <Story key={storyEdge.node.id} story={storyEdge.node} />)}
      <InfiniteScrollTrigger
        onEndReached={onEndReached}
        hasNext={hasNext}
        isLoadingNext={isLoadingNext}
      />
    </>
  );
}