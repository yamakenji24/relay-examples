/**
 * @generated SignedSource<<1768733e01b0d2de7f6ab09920dcbb3f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PosterBylineFragment$data = {
  readonly name: string | null;
  readonly profilePicture: {
    readonly url: string;
  } | null;
  readonly " $fragmentType": "PosterBylineFragment";
};
export type PosterBylineFragment$key = {
  readonly " $data"?: PosterBylineFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PosterBylineFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PosterBylineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "profilePicture",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "url",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Actor",
  "abstractKey": "__isActor"
};

(node as any).hash = "02033e04df564df419a9aa123aedadfa";

export default node;
