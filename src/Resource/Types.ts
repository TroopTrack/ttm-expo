import { Method } from 'ajaxian';
import { Maybe } from 'maybeasy';
import { err, ok, Result } from 'resulty';
import { find } from '../Collections/find';
import Decoder from 'jsonous';
import { resourceDecoder as resourceDecoderR } from '@execonline-inc/resource';

const rels = {
  login: '',
};

export const toRel = (value: string): Result<string, Rel> =>
  rels.hasOwnProperty(value)
    ? ok(value as Rel)
    : err(`Expected to find an HTTP rel string. Instead I found ${value}`);

export const resourceDecoder: <T>(
  payloadDecoder: Decoder<T>
) => Decoder<Resource<T>> = resourceDecoderR(toRel);

export type Rel = keyof typeof rels;

export interface Link {
  rel: Rel;
  href: string;
  method: Method;
  type: string;
}

export interface ServerError {
  type: string;
  param: string;
  message: string;
  code: string;
  source: string;
}

export interface Linkable {
  links: ReadonlyArray<Link>;
}

export interface PossiblyLinkable {
  whenLinks: Maybe<Linkable>;
}

export interface Resource<T> extends Linkable {
  payload: T;
}

export interface ResourceWithErrors<T> extends Resource<T> {
  errors: ServerError[];
}

export interface IdentifiablePayload {
  id: number;
}

export interface ResourceWithMetadata<T, M> extends Resource<T> {
  metadata: M;
}

export const resource = <T>(
  links: ReadonlyArray<Link>,
  payload: T
): Resource<T> => ({
  links,
  payload,
});

export const payload = <A, R extends Resource<A>>(r: R): A => r.payload;

export const links = <R extends Linkable>(r: R): ReadonlyArray<Link> => r.links;
