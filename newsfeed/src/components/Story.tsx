import * as React from "react";
import { graphql } from 'relay-runtime';
import { useFragment } from 'react-relay';
import Card from "./Card";
import Heading from "./Heading";
import PosterByline from "./PosterByline";
import StorySummary from "./StorySummary";
import Image from "./Image";
import Timestamp from './Timestamp';
import type { StoryFragment$key } from "./__generated__/StoryFragment.graphql";

const StoryFragment = graphql`
  fragment StoryFragment on Story {
    title
    summary
    createdAt
    poster {
      ...PosterBylineFragment
    }
    thumbnail {
      url
    }
  }
`;

type Props = {
  story: StoryFragment$key
};

export default function Story({ story }: Props): React.ReactElement {
  const {poster, title, createdAt, thumbnail, summary} = useFragment(StoryFragment, story);

  return (
    <Card>
      <PosterByline poster={poster} />
      <Heading>{title}</Heading>
      <Timestamp time={createdAt} />
      <Image image={thumbnail} width={400} height={400} />
      <StorySummary summary={summary} />
    </Card>
  );
}
