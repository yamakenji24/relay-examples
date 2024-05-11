import * as React from "react";
import { graphql } from 'relay-runtime';
import { useFragment, useQueryLoader } from 'react-relay';
import Image from "./Image";
import type { PosterBylineFragment$key } from "./__generated__/PosterBylineFragment.graphql";
import type {PosterDetailsHovercardContentsQuery as HovercardQueryType} from './__generated__/PosterDetailsHovercardContentsQuery.graphql';
import Hovercard from './Hovercard';
import PosterDetailsHovercardContents from './PosterDetailsHovercardContents';
import {PosterDetailsHovercardContentsQuery} from './PosterDetailsHovercardContents';

const PosterBylineFragment = graphql`
  fragment PosterBylineFragment on Actor {
    id
    name
    profilePicture {
      ...ImageFragment @arguments(width: 60, height: 60)
    }
  }
`

export type Props = {
  poster: PosterBylineFragment$key
};

export default function PosterByline({ poster }: Props): React.ReactElement {
  const data = useFragment(PosterBylineFragment, poster);
  const hoverRef = React.useRef<HTMLDivElement>(null);
  const [
    hovercardQueryRef,
    loadHovercardQuery,
  ] = useQueryLoader<HovercardQueryType>(PosterDetailsHovercardContentsQuery);

  const onBeginHover = React.useCallback(() => {
    loadHovercardQuery({posterID: data.id});
  }, []);

  return (
    <div ref={hoverRef} className="byline">
      <Image
        image={data.profilePicture}
        width={60}
        height={60}
        className="byline__image"
      />
      <div className="byline__name">{data.name}</div>
      <Hovercard onBeginHover={onBeginHover} targetRef={hoverRef}>
        <PosterDetailsHovercardContents queryRef={hovercardQueryRef} />
      </Hovercard>
    </div>
  );
}
