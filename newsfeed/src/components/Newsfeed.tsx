import * as React from "react";
import Story from "./Story";
import { graphql, useLazyLoadQuery } from "react-relay";
import { NewsfeedQuery as NewsfeedQueryType } from "./__generated__/NewsfeedQuery.graphql";

const NewsFeedQuery = graphql`
  query NewsfeedQuery {
    topStory {
      ...StoryFragment
    }
  }
`

export default function Newsfeed() {
  const data = useLazyLoadQuery<NewsfeedQueryType>(NewsFeedQuery, {});
  const story = data.topStory;

  return (
    <div className="newsfeed">
      <Story story={story} />
    </div>
  );
}
