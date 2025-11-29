
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Rating
 * 
 */
export type Rating = $Result.DefaultSelection<Prisma.$RatingPayload>
/**
 * Model Game
 * 
 */
export type Game = $Result.DefaultSelection<Prisma.$GamePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const TimeControl: {
  BULLET: 'BULLET',
  BLITZ: 'BLITZ',
  RAPID: 'RAPID',
  CLASSICAL: 'CLASSICAL'
};

export type TimeControl = (typeof TimeControl)[keyof typeof TimeControl]


export const GameStatus: {
  WAITING_FOR_START: 'WAITING_FOR_START',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  ABORTED: 'ABORTED'
};

export type GameStatus = (typeof GameStatus)[keyof typeof GameStatus]

}

export type TimeControl = $Enums.TimeControl

export const TimeControl: typeof $Enums.TimeControl

export type GameStatus = $Enums.GameStatus

export const GameStatus: typeof $Enums.GameStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rating`: Exposes CRUD operations for the **Rating** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ratings
    * const ratings = await prisma.rating.findMany()
    * ```
    */
  get rating(): Prisma.RatingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.game`: Exposes CRUD operations for the **Game** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Games
    * const games = await prisma.game.findMany()
    * ```
    */
  get game(): Prisma.GameDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.0.0
   * Query Engine version: 0c19ccc313cf9911a90d99d2ac2eb0280c76c513
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Rating: 'Rating',
    Game: 'Game'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "rating" | "game"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Rating: {
        payload: Prisma.$RatingPayload<ExtArgs>
        fields: Prisma.RatingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RatingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RatingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          findFirst: {
            args: Prisma.RatingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RatingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          findMany: {
            args: Prisma.RatingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>[]
          }
          create: {
            args: Prisma.RatingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          createMany: {
            args: Prisma.RatingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RatingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>[]
          }
          delete: {
            args: Prisma.RatingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          update: {
            args: Prisma.RatingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          deleteMany: {
            args: Prisma.RatingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RatingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RatingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>[]
          }
          upsert: {
            args: Prisma.RatingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          aggregate: {
            args: Prisma.RatingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRating>
          }
          groupBy: {
            args: Prisma.RatingGroupByArgs<ExtArgs>
            result: $Utils.Optional<RatingGroupByOutputType>[]
          }
          count: {
            args: Prisma.RatingCountArgs<ExtArgs>
            result: $Utils.Optional<RatingCountAggregateOutputType> | number
          }
        }
      }
      Game: {
        payload: Prisma.$GamePayload<ExtArgs>
        fields: Prisma.GameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findFirst: {
            args: Prisma.GameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findMany: {
            args: Prisma.GameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          create: {
            args: Prisma.GameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          createMany: {
            args: Prisma.GameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          delete: {
            args: Prisma.GameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          update: {
            args: Prisma.GameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          deleteMany: {
            args: Prisma.GameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GameUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          upsert: {
            args: Prisma.GameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          aggregate: {
            args: Prisma.GameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGame>
          }
          groupBy: {
            args: Prisma.GameGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameCountArgs<ExtArgs>
            result: $Utils.Optional<GameCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    rating?: RatingOmit
    game?: GameOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    ratings: number
    gamesAsWhite: number
    gamesAsBlack: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ratings?: boolean | UserCountOutputTypeCountRatingsArgs
    gamesAsWhite?: boolean | UserCountOutputTypeCountGamesAsWhiteArgs
    gamesAsBlack?: boolean | UserCountOutputTypeCountGamesAsBlackArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRatingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RatingWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGamesAsWhiteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGamesAsBlackArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    fideRating: number | null
    uscfRating: number | null
    ecfRating: number | null
    rcfRating: number | null
    cfcRating: number | null
    dsbRating: number | null
  }

  export type UserSumAggregateOutputType = {
    fideRating: number | null
    uscfRating: number | null
    ecfRating: number | null
    rcfRating: number | null
    cfcRating: number | null
    dsbRating: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    email: string | null
    username: string | null
    passwordHash: string | null
    isEmailVerified: boolean | null
    refreshTokenHash: string | null
    lastLoginAt: Date | null
    biography: string | null
    flair: string | null
    country: string | null
    location: string | null
    realName: string | null
    fideRating: number | null
    uscfRating: number | null
    ecfRating: number | null
    rcfRating: number | null
    cfcRating: number | null
    dsbRating: number | null
    socialLinks: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    email: string | null
    username: string | null
    passwordHash: string | null
    isEmailVerified: boolean | null
    refreshTokenHash: string | null
    lastLoginAt: Date | null
    biography: string | null
    flair: string | null
    country: string | null
    location: string | null
    realName: string | null
    fideRating: number | null
    uscfRating: number | null
    ecfRating: number | null
    rcfRating: number | null
    cfcRating: number | null
    dsbRating: number | null
    socialLinks: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    email: number
    username: number
    passwordHash: number
    isEmailVerified: number
    refreshTokenHash: number
    lastLoginAt: number
    biography: number
    flair: number
    country: number
    location: number
    realName: number
    fideRating: number
    uscfRating: number
    ecfRating: number
    rcfRating: number
    cfcRating: number
    dsbRating: number
    socialLinks: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    fideRating?: true
    uscfRating?: true
    ecfRating?: true
    rcfRating?: true
    cfcRating?: true
    dsbRating?: true
  }

  export type UserSumAggregateInputType = {
    fideRating?: true
    uscfRating?: true
    ecfRating?: true
    rcfRating?: true
    cfcRating?: true
    dsbRating?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    email?: true
    username?: true
    passwordHash?: true
    isEmailVerified?: true
    refreshTokenHash?: true
    lastLoginAt?: true
    biography?: true
    flair?: true
    country?: true
    location?: true
    realName?: true
    fideRating?: true
    uscfRating?: true
    ecfRating?: true
    rcfRating?: true
    cfcRating?: true
    dsbRating?: true
    socialLinks?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    email?: true
    username?: true
    passwordHash?: true
    isEmailVerified?: true
    refreshTokenHash?: true
    lastLoginAt?: true
    biography?: true
    flair?: true
    country?: true
    location?: true
    realName?: true
    fideRating?: true
    uscfRating?: true
    ecfRating?: true
    rcfRating?: true
    cfcRating?: true
    dsbRating?: true
    socialLinks?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    email?: true
    username?: true
    passwordHash?: true
    isEmailVerified?: true
    refreshTokenHash?: true
    lastLoginAt?: true
    biography?: true
    flair?: true
    country?: true
    location?: true
    realName?: true
    fideRating?: true
    uscfRating?: true
    ecfRating?: true
    rcfRating?: true
    cfcRating?: true
    dsbRating?: true
    socialLinks?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    email: string
    username: string
    passwordHash: string
    isEmailVerified: boolean
    refreshTokenHash: string | null
    lastLoginAt: Date | null
    biography: string | null
    flair: string | null
    country: string | null
    location: string | null
    realName: string | null
    fideRating: number | null
    uscfRating: number | null
    ecfRating: number | null
    rcfRating: number | null
    cfcRating: number | null
    dsbRating: number | null
    socialLinks: string | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    email?: boolean
    username?: boolean
    passwordHash?: boolean
    isEmailVerified?: boolean
    refreshTokenHash?: boolean
    lastLoginAt?: boolean
    biography?: boolean
    flair?: boolean
    country?: boolean
    location?: boolean
    realName?: boolean
    fideRating?: boolean
    uscfRating?: boolean
    ecfRating?: boolean
    rcfRating?: boolean
    cfcRating?: boolean
    dsbRating?: boolean
    socialLinks?: boolean
    ratings?: boolean | User$ratingsArgs<ExtArgs>
    gamesAsWhite?: boolean | User$gamesAsWhiteArgs<ExtArgs>
    gamesAsBlack?: boolean | User$gamesAsBlackArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    email?: boolean
    username?: boolean
    passwordHash?: boolean
    isEmailVerified?: boolean
    refreshTokenHash?: boolean
    lastLoginAt?: boolean
    biography?: boolean
    flair?: boolean
    country?: boolean
    location?: boolean
    realName?: boolean
    fideRating?: boolean
    uscfRating?: boolean
    ecfRating?: boolean
    rcfRating?: boolean
    cfcRating?: boolean
    dsbRating?: boolean
    socialLinks?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    email?: boolean
    username?: boolean
    passwordHash?: boolean
    isEmailVerified?: boolean
    refreshTokenHash?: boolean
    lastLoginAt?: boolean
    biography?: boolean
    flair?: boolean
    country?: boolean
    location?: boolean
    realName?: boolean
    fideRating?: boolean
    uscfRating?: boolean
    ecfRating?: boolean
    rcfRating?: boolean
    cfcRating?: boolean
    dsbRating?: boolean
    socialLinks?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    email?: boolean
    username?: boolean
    passwordHash?: boolean
    isEmailVerified?: boolean
    refreshTokenHash?: boolean
    lastLoginAt?: boolean
    biography?: boolean
    flair?: boolean
    country?: boolean
    location?: boolean
    realName?: boolean
    fideRating?: boolean
    uscfRating?: boolean
    ecfRating?: boolean
    rcfRating?: boolean
    cfcRating?: boolean
    dsbRating?: boolean
    socialLinks?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "email" | "username" | "passwordHash" | "isEmailVerified" | "refreshTokenHash" | "lastLoginAt" | "biography" | "flair" | "country" | "location" | "realName" | "fideRating" | "uscfRating" | "ecfRating" | "rcfRating" | "cfcRating" | "dsbRating" | "socialLinks", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ratings?: boolean | User$ratingsArgs<ExtArgs>
    gamesAsWhite?: boolean | User$gamesAsWhiteArgs<ExtArgs>
    gamesAsBlack?: boolean | User$gamesAsBlackArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      ratings: Prisma.$RatingPayload<ExtArgs>[]
      gamesAsWhite: Prisma.$GamePayload<ExtArgs>[]
      gamesAsBlack: Prisma.$GamePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      email: string
      username: string
      passwordHash: string
      isEmailVerified: boolean
      refreshTokenHash: string | null
      lastLoginAt: Date | null
      biography: string | null
      flair: string | null
      country: string | null
      location: string | null
      realName: string | null
      fideRating: number | null
      uscfRating: number | null
      ecfRating: number | null
      rcfRating: number | null
      cfcRating: number | null
      dsbRating: number | null
      socialLinks: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ratings<T extends User$ratingsArgs<ExtArgs> = {}>(args?: Subset<T, User$ratingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    gamesAsWhite<T extends User$gamesAsWhiteArgs<ExtArgs> = {}>(args?: Subset<T, User$gamesAsWhiteArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    gamesAsBlack<T extends User$gamesAsBlackArgs<ExtArgs> = {}>(args?: Subset<T, User$gamesAsBlackArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly email: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly isEmailVerified: FieldRef<"User", 'Boolean'>
    readonly refreshTokenHash: FieldRef<"User", 'String'>
    readonly lastLoginAt: FieldRef<"User", 'DateTime'>
    readonly biography: FieldRef<"User", 'String'>
    readonly flair: FieldRef<"User", 'String'>
    readonly country: FieldRef<"User", 'String'>
    readonly location: FieldRef<"User", 'String'>
    readonly realName: FieldRef<"User", 'String'>
    readonly fideRating: FieldRef<"User", 'Int'>
    readonly uscfRating: FieldRef<"User", 'Int'>
    readonly ecfRating: FieldRef<"User", 'Int'>
    readonly rcfRating: FieldRef<"User", 'Int'>
    readonly cfcRating: FieldRef<"User", 'Int'>
    readonly dsbRating: FieldRef<"User", 'Int'>
    readonly socialLinks: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.ratings
   */
  export type User$ratingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    where?: RatingWhereInput
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    cursor?: RatingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RatingScalarFieldEnum | RatingScalarFieldEnum[]
  }

  /**
   * User.gamesAsWhite
   */
  export type User$gamesAsWhiteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    where?: GameWhereInput
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    cursor?: GameWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * User.gamesAsBlack
   */
  export type User$gamesAsBlackArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    where?: GameWhereInput
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    cursor?: GameWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Rating
   */

  export type AggregateRating = {
    _count: RatingCountAggregateOutputType | null
    _avg: RatingAvgAggregateOutputType | null
    _sum: RatingSumAggregateOutputType | null
    _min: RatingMinAggregateOutputType | null
    _max: RatingMaxAggregateOutputType | null
  }

  export type RatingAvgAggregateOutputType = {
    rating: number | null
    deviation: number | null
    volatility: number | null
  }

  export type RatingSumAggregateOutputType = {
    rating: number | null
    deviation: number | null
    volatility: number | null
  }

  export type RatingMinAggregateOutputType = {
    id: string | null
    userId: string | null
    timeControl: $Enums.TimeControl | null
    rating: number | null
    deviation: number | null
    volatility: number | null
    updatedAt: Date | null
  }

  export type RatingMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    timeControl: $Enums.TimeControl | null
    rating: number | null
    deviation: number | null
    volatility: number | null
    updatedAt: Date | null
  }

  export type RatingCountAggregateOutputType = {
    id: number
    userId: number
    timeControl: number
    rating: number
    deviation: number
    volatility: number
    updatedAt: number
    _all: number
  }


  export type RatingAvgAggregateInputType = {
    rating?: true
    deviation?: true
    volatility?: true
  }

  export type RatingSumAggregateInputType = {
    rating?: true
    deviation?: true
    volatility?: true
  }

  export type RatingMinAggregateInputType = {
    id?: true
    userId?: true
    timeControl?: true
    rating?: true
    deviation?: true
    volatility?: true
    updatedAt?: true
  }

  export type RatingMaxAggregateInputType = {
    id?: true
    userId?: true
    timeControl?: true
    rating?: true
    deviation?: true
    volatility?: true
    updatedAt?: true
  }

  export type RatingCountAggregateInputType = {
    id?: true
    userId?: true
    timeControl?: true
    rating?: true
    deviation?: true
    volatility?: true
    updatedAt?: true
    _all?: true
  }

  export type RatingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rating to aggregate.
     */
    where?: RatingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ratings to fetch.
     */
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RatingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ratings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ratings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Ratings
    **/
    _count?: true | RatingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RatingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RatingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RatingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RatingMaxAggregateInputType
  }

  export type GetRatingAggregateType<T extends RatingAggregateArgs> = {
        [P in keyof T & keyof AggregateRating]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRating[P]>
      : GetScalarType<T[P], AggregateRating[P]>
  }




  export type RatingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RatingWhereInput
    orderBy?: RatingOrderByWithAggregationInput | RatingOrderByWithAggregationInput[]
    by: RatingScalarFieldEnum[] | RatingScalarFieldEnum
    having?: RatingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RatingCountAggregateInputType | true
    _avg?: RatingAvgAggregateInputType
    _sum?: RatingSumAggregateInputType
    _min?: RatingMinAggregateInputType
    _max?: RatingMaxAggregateInputType
  }

  export type RatingGroupByOutputType = {
    id: string
    userId: string
    timeControl: $Enums.TimeControl
    rating: number
    deviation: number
    volatility: number
    updatedAt: Date
    _count: RatingCountAggregateOutputType | null
    _avg: RatingAvgAggregateOutputType | null
    _sum: RatingSumAggregateOutputType | null
    _min: RatingMinAggregateOutputType | null
    _max: RatingMaxAggregateOutputType | null
  }

  type GetRatingGroupByPayload<T extends RatingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RatingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RatingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RatingGroupByOutputType[P]>
            : GetScalarType<T[P], RatingGroupByOutputType[P]>
        }
      >
    >


  export type RatingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    timeControl?: boolean
    rating?: boolean
    deviation?: boolean
    volatility?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rating"]>

  export type RatingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    timeControl?: boolean
    rating?: boolean
    deviation?: boolean
    volatility?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rating"]>

  export type RatingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    timeControl?: boolean
    rating?: boolean
    deviation?: boolean
    volatility?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rating"]>

  export type RatingSelectScalar = {
    id?: boolean
    userId?: boolean
    timeControl?: boolean
    rating?: boolean
    deviation?: boolean
    volatility?: boolean
    updatedAt?: boolean
  }

  export type RatingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "timeControl" | "rating" | "deviation" | "volatility" | "updatedAt", ExtArgs["result"]["rating"]>
  export type RatingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RatingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RatingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RatingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Rating"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      timeControl: $Enums.TimeControl
      rating: number
      deviation: number
      volatility: number
      updatedAt: Date
    }, ExtArgs["result"]["rating"]>
    composites: {}
  }

  type RatingGetPayload<S extends boolean | null | undefined | RatingDefaultArgs> = $Result.GetResult<Prisma.$RatingPayload, S>

  type RatingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RatingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RatingCountAggregateInputType | true
    }

  export interface RatingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Rating'], meta: { name: 'Rating' } }
    /**
     * Find zero or one Rating that matches the filter.
     * @param {RatingFindUniqueArgs} args - Arguments to find a Rating
     * @example
     * // Get one Rating
     * const rating = await prisma.rating.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RatingFindUniqueArgs>(args: SelectSubset<T, RatingFindUniqueArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Rating that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RatingFindUniqueOrThrowArgs} args - Arguments to find a Rating
     * @example
     * // Get one Rating
     * const rating = await prisma.rating.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RatingFindUniqueOrThrowArgs>(args: SelectSubset<T, RatingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rating that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingFindFirstArgs} args - Arguments to find a Rating
     * @example
     * // Get one Rating
     * const rating = await prisma.rating.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RatingFindFirstArgs>(args?: SelectSubset<T, RatingFindFirstArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rating that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingFindFirstOrThrowArgs} args - Arguments to find a Rating
     * @example
     * // Get one Rating
     * const rating = await prisma.rating.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RatingFindFirstOrThrowArgs>(args?: SelectSubset<T, RatingFindFirstOrThrowArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Ratings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ratings
     * const ratings = await prisma.rating.findMany()
     * 
     * // Get first 10 Ratings
     * const ratings = await prisma.rating.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ratingWithIdOnly = await prisma.rating.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RatingFindManyArgs>(args?: SelectSubset<T, RatingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Rating.
     * @param {RatingCreateArgs} args - Arguments to create a Rating.
     * @example
     * // Create one Rating
     * const Rating = await prisma.rating.create({
     *   data: {
     *     // ... data to create a Rating
     *   }
     * })
     * 
     */
    create<T extends RatingCreateArgs>(args: SelectSubset<T, RatingCreateArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Ratings.
     * @param {RatingCreateManyArgs} args - Arguments to create many Ratings.
     * @example
     * // Create many Ratings
     * const rating = await prisma.rating.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RatingCreateManyArgs>(args?: SelectSubset<T, RatingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Ratings and returns the data saved in the database.
     * @param {RatingCreateManyAndReturnArgs} args - Arguments to create many Ratings.
     * @example
     * // Create many Ratings
     * const rating = await prisma.rating.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Ratings and only return the `id`
     * const ratingWithIdOnly = await prisma.rating.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RatingCreateManyAndReturnArgs>(args?: SelectSubset<T, RatingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Rating.
     * @param {RatingDeleteArgs} args - Arguments to delete one Rating.
     * @example
     * // Delete one Rating
     * const Rating = await prisma.rating.delete({
     *   where: {
     *     // ... filter to delete one Rating
     *   }
     * })
     * 
     */
    delete<T extends RatingDeleteArgs>(args: SelectSubset<T, RatingDeleteArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Rating.
     * @param {RatingUpdateArgs} args - Arguments to update one Rating.
     * @example
     * // Update one Rating
     * const rating = await prisma.rating.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RatingUpdateArgs>(args: SelectSubset<T, RatingUpdateArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Ratings.
     * @param {RatingDeleteManyArgs} args - Arguments to filter Ratings to delete.
     * @example
     * // Delete a few Ratings
     * const { count } = await prisma.rating.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RatingDeleteManyArgs>(args?: SelectSubset<T, RatingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ratings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ratings
     * const rating = await prisma.rating.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RatingUpdateManyArgs>(args: SelectSubset<T, RatingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ratings and returns the data updated in the database.
     * @param {RatingUpdateManyAndReturnArgs} args - Arguments to update many Ratings.
     * @example
     * // Update many Ratings
     * const rating = await prisma.rating.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Ratings and only return the `id`
     * const ratingWithIdOnly = await prisma.rating.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RatingUpdateManyAndReturnArgs>(args: SelectSubset<T, RatingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Rating.
     * @param {RatingUpsertArgs} args - Arguments to update or create a Rating.
     * @example
     * // Update or create a Rating
     * const rating = await prisma.rating.upsert({
     *   create: {
     *     // ... data to create a Rating
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Rating we want to update
     *   }
     * })
     */
    upsert<T extends RatingUpsertArgs>(args: SelectSubset<T, RatingUpsertArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Ratings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingCountArgs} args - Arguments to filter Ratings to count.
     * @example
     * // Count the number of Ratings
     * const count = await prisma.rating.count({
     *   where: {
     *     // ... the filter for the Ratings we want to count
     *   }
     * })
    **/
    count<T extends RatingCountArgs>(
      args?: Subset<T, RatingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RatingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Rating.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RatingAggregateArgs>(args: Subset<T, RatingAggregateArgs>): Prisma.PrismaPromise<GetRatingAggregateType<T>>

    /**
     * Group by Rating.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RatingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RatingGroupByArgs['orderBy'] }
        : { orderBy?: RatingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RatingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRatingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Rating model
   */
  readonly fields: RatingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Rating.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RatingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Rating model
   */
  interface RatingFieldRefs {
    readonly id: FieldRef<"Rating", 'String'>
    readonly userId: FieldRef<"Rating", 'String'>
    readonly timeControl: FieldRef<"Rating", 'TimeControl'>
    readonly rating: FieldRef<"Rating", 'Int'>
    readonly deviation: FieldRef<"Rating", 'Float'>
    readonly volatility: FieldRef<"Rating", 'Float'>
    readonly updatedAt: FieldRef<"Rating", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Rating findUnique
   */
  export type RatingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter, which Rating to fetch.
     */
    where: RatingWhereUniqueInput
  }

  /**
   * Rating findUniqueOrThrow
   */
  export type RatingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter, which Rating to fetch.
     */
    where: RatingWhereUniqueInput
  }

  /**
   * Rating findFirst
   */
  export type RatingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter, which Rating to fetch.
     */
    where?: RatingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ratings to fetch.
     */
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ratings.
     */
    cursor?: RatingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ratings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ratings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ratings.
     */
    distinct?: RatingScalarFieldEnum | RatingScalarFieldEnum[]
  }

  /**
   * Rating findFirstOrThrow
   */
  export type RatingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter, which Rating to fetch.
     */
    where?: RatingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ratings to fetch.
     */
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ratings.
     */
    cursor?: RatingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ratings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ratings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ratings.
     */
    distinct?: RatingScalarFieldEnum | RatingScalarFieldEnum[]
  }

  /**
   * Rating findMany
   */
  export type RatingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter, which Ratings to fetch.
     */
    where?: RatingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ratings to fetch.
     */
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Ratings.
     */
    cursor?: RatingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ratings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ratings.
     */
    skip?: number
    distinct?: RatingScalarFieldEnum | RatingScalarFieldEnum[]
  }

  /**
   * Rating create
   */
  export type RatingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * The data needed to create a Rating.
     */
    data: XOR<RatingCreateInput, RatingUncheckedCreateInput>
  }

  /**
   * Rating createMany
   */
  export type RatingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Ratings.
     */
    data: RatingCreateManyInput | RatingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Rating createManyAndReturn
   */
  export type RatingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * The data used to create many Ratings.
     */
    data: RatingCreateManyInput | RatingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Rating update
   */
  export type RatingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * The data needed to update a Rating.
     */
    data: XOR<RatingUpdateInput, RatingUncheckedUpdateInput>
    /**
     * Choose, which Rating to update.
     */
    where: RatingWhereUniqueInput
  }

  /**
   * Rating updateMany
   */
  export type RatingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Ratings.
     */
    data: XOR<RatingUpdateManyMutationInput, RatingUncheckedUpdateManyInput>
    /**
     * Filter which Ratings to update
     */
    where?: RatingWhereInput
    /**
     * Limit how many Ratings to update.
     */
    limit?: number
  }

  /**
   * Rating updateManyAndReturn
   */
  export type RatingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * The data used to update Ratings.
     */
    data: XOR<RatingUpdateManyMutationInput, RatingUncheckedUpdateManyInput>
    /**
     * Filter which Ratings to update
     */
    where?: RatingWhereInput
    /**
     * Limit how many Ratings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Rating upsert
   */
  export type RatingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * The filter to search for the Rating to update in case it exists.
     */
    where: RatingWhereUniqueInput
    /**
     * In case the Rating found by the `where` argument doesn't exist, create a new Rating with this data.
     */
    create: XOR<RatingCreateInput, RatingUncheckedCreateInput>
    /**
     * In case the Rating was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RatingUpdateInput, RatingUncheckedUpdateInput>
  }

  /**
   * Rating delete
   */
  export type RatingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter which Rating to delete.
     */
    where: RatingWhereUniqueInput
  }

  /**
   * Rating deleteMany
   */
  export type RatingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ratings to delete
     */
    where?: RatingWhereInput
    /**
     * Limit how many Ratings to delete.
     */
    limit?: number
  }

  /**
   * Rating without action
   */
  export type RatingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
  }


  /**
   * Model Game
   */

  export type AggregateGame = {
    _count: GameCountAggregateOutputType | null
    _avg: GameAvgAggregateOutputType | null
    _sum: GameSumAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  export type GameAvgAggregateOutputType = {
    whiteRating: number | null
    blackRating: number | null
    whiteDeviation: number | null
    blackDeviation: number | null
    whiteVolatility: number | null
    blackVolatility: number | null
  }

  export type GameSumAggregateOutputType = {
    whiteRating: number | null
    blackRating: number | null
    whiteDeviation: number | null
    blackDeviation: number | null
    whiteVolatility: number | null
    blackVolatility: number | null
  }

  export type GameMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    timeControl: $Enums.TimeControl | null
    status: $Enums.GameStatus | null
    whiteUserId: string | null
    blackUserId: string | null
    whiteRating: number | null
    blackRating: number | null
    whiteDeviation: number | null
    blackDeviation: number | null
    whiteVolatility: number | null
    blackVolatility: number | null
    initialFen: string | null
    startedAt: Date | null
    abortedAt: Date | null
  }

  export type GameMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    timeControl: $Enums.TimeControl | null
    status: $Enums.GameStatus | null
    whiteUserId: string | null
    blackUserId: string | null
    whiteRating: number | null
    blackRating: number | null
    whiteDeviation: number | null
    blackDeviation: number | null
    whiteVolatility: number | null
    blackVolatility: number | null
    initialFen: string | null
    startedAt: Date | null
    abortedAt: Date | null
  }

  export type GameCountAggregateOutputType = {
    id: number
    createdAt: number
    timeControl: number
    status: number
    whiteUserId: number
    blackUserId: number
    whiteRating: number
    blackRating: number
    whiteDeviation: number
    blackDeviation: number
    whiteVolatility: number
    blackVolatility: number
    initialFen: number
    startedAt: number
    abortedAt: number
    _all: number
  }


  export type GameAvgAggregateInputType = {
    whiteRating?: true
    blackRating?: true
    whiteDeviation?: true
    blackDeviation?: true
    whiteVolatility?: true
    blackVolatility?: true
  }

  export type GameSumAggregateInputType = {
    whiteRating?: true
    blackRating?: true
    whiteDeviation?: true
    blackDeviation?: true
    whiteVolatility?: true
    blackVolatility?: true
  }

  export type GameMinAggregateInputType = {
    id?: true
    createdAt?: true
    timeControl?: true
    status?: true
    whiteUserId?: true
    blackUserId?: true
    whiteRating?: true
    blackRating?: true
    whiteDeviation?: true
    blackDeviation?: true
    whiteVolatility?: true
    blackVolatility?: true
    initialFen?: true
    startedAt?: true
    abortedAt?: true
  }

  export type GameMaxAggregateInputType = {
    id?: true
    createdAt?: true
    timeControl?: true
    status?: true
    whiteUserId?: true
    blackUserId?: true
    whiteRating?: true
    blackRating?: true
    whiteDeviation?: true
    blackDeviation?: true
    whiteVolatility?: true
    blackVolatility?: true
    initialFen?: true
    startedAt?: true
    abortedAt?: true
  }

  export type GameCountAggregateInputType = {
    id?: true
    createdAt?: true
    timeControl?: true
    status?: true
    whiteUserId?: true
    blackUserId?: true
    whiteRating?: true
    blackRating?: true
    whiteDeviation?: true
    blackDeviation?: true
    whiteVolatility?: true
    blackVolatility?: true
    initialFen?: true
    startedAt?: true
    abortedAt?: true
    _all?: true
  }

  export type GameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Game to aggregate.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Games
    **/
    _count?: true | GameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GameAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GameSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameMaxAggregateInputType
  }

  export type GetGameAggregateType<T extends GameAggregateArgs> = {
        [P in keyof T & keyof AggregateGame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGame[P]>
      : GetScalarType<T[P], AggregateGame[P]>
  }




  export type GameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameWhereInput
    orderBy?: GameOrderByWithAggregationInput | GameOrderByWithAggregationInput[]
    by: GameScalarFieldEnum[] | GameScalarFieldEnum
    having?: GameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameCountAggregateInputType | true
    _avg?: GameAvgAggregateInputType
    _sum?: GameSumAggregateInputType
    _min?: GameMinAggregateInputType
    _max?: GameMaxAggregateInputType
  }

  export type GameGroupByOutputType = {
    id: string
    createdAt: Date
    timeControl: $Enums.TimeControl
    status: $Enums.GameStatus
    whiteUserId: string | null
    blackUserId: string | null
    whiteRating: number
    blackRating: number
    whiteDeviation: number
    blackDeviation: number
    whiteVolatility: number
    blackVolatility: number
    initialFen: string
    startedAt: Date | null
    abortedAt: Date | null
    _count: GameCountAggregateOutputType | null
    _avg: GameAvgAggregateOutputType | null
    _sum: GameSumAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  type GetGameGroupByPayload<T extends GameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameGroupByOutputType[P]>
            : GetScalarType<T[P], GameGroupByOutputType[P]>
        }
      >
    >


  export type GameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    timeControl?: boolean
    status?: boolean
    whiteUserId?: boolean
    blackUserId?: boolean
    whiteRating?: boolean
    blackRating?: boolean
    whiteDeviation?: boolean
    blackDeviation?: boolean
    whiteVolatility?: boolean
    blackVolatility?: boolean
    initialFen?: boolean
    startedAt?: boolean
    abortedAt?: boolean
    whiteUser?: boolean | Game$whiteUserArgs<ExtArgs>
    blackUser?: boolean | Game$blackUserArgs<ExtArgs>
  }, ExtArgs["result"]["game"]>

  export type GameSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    timeControl?: boolean
    status?: boolean
    whiteUserId?: boolean
    blackUserId?: boolean
    whiteRating?: boolean
    blackRating?: boolean
    whiteDeviation?: boolean
    blackDeviation?: boolean
    whiteVolatility?: boolean
    blackVolatility?: boolean
    initialFen?: boolean
    startedAt?: boolean
    abortedAt?: boolean
    whiteUser?: boolean | Game$whiteUserArgs<ExtArgs>
    blackUser?: boolean | Game$blackUserArgs<ExtArgs>
  }, ExtArgs["result"]["game"]>

  export type GameSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    timeControl?: boolean
    status?: boolean
    whiteUserId?: boolean
    blackUserId?: boolean
    whiteRating?: boolean
    blackRating?: boolean
    whiteDeviation?: boolean
    blackDeviation?: boolean
    whiteVolatility?: boolean
    blackVolatility?: boolean
    initialFen?: boolean
    startedAt?: boolean
    abortedAt?: boolean
    whiteUser?: boolean | Game$whiteUserArgs<ExtArgs>
    blackUser?: boolean | Game$blackUserArgs<ExtArgs>
  }, ExtArgs["result"]["game"]>

  export type GameSelectScalar = {
    id?: boolean
    createdAt?: boolean
    timeControl?: boolean
    status?: boolean
    whiteUserId?: boolean
    blackUserId?: boolean
    whiteRating?: boolean
    blackRating?: boolean
    whiteDeviation?: boolean
    blackDeviation?: boolean
    whiteVolatility?: boolean
    blackVolatility?: boolean
    initialFen?: boolean
    startedAt?: boolean
    abortedAt?: boolean
  }

  export type GameOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "timeControl" | "status" | "whiteUserId" | "blackUserId" | "whiteRating" | "blackRating" | "whiteDeviation" | "blackDeviation" | "whiteVolatility" | "blackVolatility" | "initialFen" | "startedAt" | "abortedAt", ExtArgs["result"]["game"]>
  export type GameInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    whiteUser?: boolean | Game$whiteUserArgs<ExtArgs>
    blackUser?: boolean | Game$blackUserArgs<ExtArgs>
  }
  export type GameIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    whiteUser?: boolean | Game$whiteUserArgs<ExtArgs>
    blackUser?: boolean | Game$blackUserArgs<ExtArgs>
  }
  export type GameIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    whiteUser?: boolean | Game$whiteUserArgs<ExtArgs>
    blackUser?: boolean | Game$blackUserArgs<ExtArgs>
  }

  export type $GamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Game"
    objects: {
      whiteUser: Prisma.$UserPayload<ExtArgs> | null
      blackUser: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      timeControl: $Enums.TimeControl
      status: $Enums.GameStatus
      whiteUserId: string | null
      blackUserId: string | null
      whiteRating: number
      blackRating: number
      whiteDeviation: number
      blackDeviation: number
      whiteVolatility: number
      blackVolatility: number
      initialFen: string
      startedAt: Date | null
      abortedAt: Date | null
    }, ExtArgs["result"]["game"]>
    composites: {}
  }

  type GameGetPayload<S extends boolean | null | undefined | GameDefaultArgs> = $Result.GetResult<Prisma.$GamePayload, S>

  type GameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GameFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GameCountAggregateInputType | true
    }

  export interface GameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Game'], meta: { name: 'Game' } }
    /**
     * Find zero or one Game that matches the filter.
     * @param {GameFindUniqueArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameFindUniqueArgs>(args: SelectSubset<T, GameFindUniqueArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Game that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GameFindUniqueOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameFindUniqueOrThrowArgs>(args: SelectSubset<T, GameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Game that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameFindFirstArgs>(args?: SelectSubset<T, GameFindFirstArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Game that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameFindFirstOrThrowArgs>(args?: SelectSubset<T, GameFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Games that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Games
     * const games = await prisma.game.findMany()
     * 
     * // Get first 10 Games
     * const games = await prisma.game.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameWithIdOnly = await prisma.game.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameFindManyArgs>(args?: SelectSubset<T, GameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Game.
     * @param {GameCreateArgs} args - Arguments to create a Game.
     * @example
     * // Create one Game
     * const Game = await prisma.game.create({
     *   data: {
     *     // ... data to create a Game
     *   }
     * })
     * 
     */
    create<T extends GameCreateArgs>(args: SelectSubset<T, GameCreateArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Games.
     * @param {GameCreateManyArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameCreateManyArgs>(args?: SelectSubset<T, GameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Games and returns the data saved in the database.
     * @param {GameCreateManyAndReturnArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameCreateManyAndReturnArgs>(args?: SelectSubset<T, GameCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Game.
     * @param {GameDeleteArgs} args - Arguments to delete one Game.
     * @example
     * // Delete one Game
     * const Game = await prisma.game.delete({
     *   where: {
     *     // ... filter to delete one Game
     *   }
     * })
     * 
     */
    delete<T extends GameDeleteArgs>(args: SelectSubset<T, GameDeleteArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Game.
     * @param {GameUpdateArgs} args - Arguments to update one Game.
     * @example
     * // Update one Game
     * const game = await prisma.game.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameUpdateArgs>(args: SelectSubset<T, GameUpdateArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Games.
     * @param {GameDeleteManyArgs} args - Arguments to filter Games to delete.
     * @example
     * // Delete a few Games
     * const { count } = await prisma.game.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameDeleteManyArgs>(args?: SelectSubset<T, GameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameUpdateManyArgs>(args: SelectSubset<T, GameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Games and returns the data updated in the database.
     * @param {GameUpdateManyAndReturnArgs} args - Arguments to update many Games.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GameUpdateManyAndReturnArgs>(args: SelectSubset<T, GameUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Game.
     * @param {GameUpsertArgs} args - Arguments to update or create a Game.
     * @example
     * // Update or create a Game
     * const game = await prisma.game.upsert({
     *   create: {
     *     // ... data to create a Game
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Game we want to update
     *   }
     * })
     */
    upsert<T extends GameUpsertArgs>(args: SelectSubset<T, GameUpsertArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCountArgs} args - Arguments to filter Games to count.
     * @example
     * // Count the number of Games
     * const count = await prisma.game.count({
     *   where: {
     *     // ... the filter for the Games we want to count
     *   }
     * })
    **/
    count<T extends GameCountArgs>(
      args?: Subset<T, GameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameAggregateArgs>(args: Subset<T, GameAggregateArgs>): Prisma.PrismaPromise<GetGameAggregateType<T>>

    /**
     * Group by Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameGroupByArgs['orderBy'] }
        : { orderBy?: GameGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Game model
   */
  readonly fields: GameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Game.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    whiteUser<T extends Game$whiteUserArgs<ExtArgs> = {}>(args?: Subset<T, Game$whiteUserArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    blackUser<T extends Game$blackUserArgs<ExtArgs> = {}>(args?: Subset<T, Game$blackUserArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Game model
   */
  interface GameFieldRefs {
    readonly id: FieldRef<"Game", 'String'>
    readonly createdAt: FieldRef<"Game", 'DateTime'>
    readonly timeControl: FieldRef<"Game", 'TimeControl'>
    readonly status: FieldRef<"Game", 'GameStatus'>
    readonly whiteUserId: FieldRef<"Game", 'String'>
    readonly blackUserId: FieldRef<"Game", 'String'>
    readonly whiteRating: FieldRef<"Game", 'Int'>
    readonly blackRating: FieldRef<"Game", 'Int'>
    readonly whiteDeviation: FieldRef<"Game", 'Float'>
    readonly blackDeviation: FieldRef<"Game", 'Float'>
    readonly whiteVolatility: FieldRef<"Game", 'Float'>
    readonly blackVolatility: FieldRef<"Game", 'Float'>
    readonly initialFen: FieldRef<"Game", 'String'>
    readonly startedAt: FieldRef<"Game", 'DateTime'>
    readonly abortedAt: FieldRef<"Game", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Game findUnique
   */
  export type GameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findUniqueOrThrow
   */
  export type GameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findFirst
   */
  export type GameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findFirstOrThrow
   */
  export type GameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findMany
   */
  export type GameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Games to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game create
   */
  export type GameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The data needed to create a Game.
     */
    data: XOR<GameCreateInput, GameUncheckedCreateInput>
  }

  /**
   * Game createMany
   */
  export type GameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Game createManyAndReturn
   */
  export type GameCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Game update
   */
  export type GameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The data needed to update a Game.
     */
    data: XOR<GameUpdateInput, GameUncheckedUpdateInput>
    /**
     * Choose, which Game to update.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game updateMany
   */
  export type GameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to update.
     */
    limit?: number
  }

  /**
   * Game updateManyAndReturn
   */
  export type GameUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Game upsert
   */
  export type GameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The filter to search for the Game to update in case it exists.
     */
    where: GameWhereUniqueInput
    /**
     * In case the Game found by the `where` argument doesn't exist, create a new Game with this data.
     */
    create: XOR<GameCreateInput, GameUncheckedCreateInput>
    /**
     * In case the Game was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameUpdateInput, GameUncheckedUpdateInput>
  }

  /**
   * Game delete
   */
  export type GameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter which Game to delete.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game deleteMany
   */
  export type GameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Games to delete
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to delete.
     */
    limit?: number
  }

  /**
   * Game.whiteUser
   */
  export type Game$whiteUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Game.blackUser
   */
  export type Game$blackUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Game without action
   */
  export type GameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    email: 'email',
    username: 'username',
    passwordHash: 'passwordHash',
    isEmailVerified: 'isEmailVerified',
    refreshTokenHash: 'refreshTokenHash',
    lastLoginAt: 'lastLoginAt',
    biography: 'biography',
    flair: 'flair',
    country: 'country',
    location: 'location',
    realName: 'realName',
    fideRating: 'fideRating',
    uscfRating: 'uscfRating',
    ecfRating: 'ecfRating',
    rcfRating: 'rcfRating',
    cfcRating: 'cfcRating',
    dsbRating: 'dsbRating',
    socialLinks: 'socialLinks'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RatingScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    timeControl: 'timeControl',
    rating: 'rating',
    deviation: 'deviation',
    volatility: 'volatility',
    updatedAt: 'updatedAt'
  };

  export type RatingScalarFieldEnum = (typeof RatingScalarFieldEnum)[keyof typeof RatingScalarFieldEnum]


  export const GameScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    timeControl: 'timeControl',
    status: 'status',
    whiteUserId: 'whiteUserId',
    blackUserId: 'blackUserId',
    whiteRating: 'whiteRating',
    blackRating: 'blackRating',
    whiteDeviation: 'whiteDeviation',
    blackDeviation: 'blackDeviation',
    whiteVolatility: 'whiteVolatility',
    blackVolatility: 'blackVolatility',
    initialFen: 'initialFen',
    startedAt: 'startedAt',
    abortedAt: 'abortedAt'
  };

  export type GameScalarFieldEnum = (typeof GameScalarFieldEnum)[keyof typeof GameScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'TimeControl'
   */
  export type EnumTimeControlFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TimeControl'>
    


  /**
   * Reference to a field of type 'TimeControl[]'
   */
  export type ListEnumTimeControlFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TimeControl[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'GameStatus'
   */
  export type EnumGameStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GameStatus'>
    


  /**
   * Reference to a field of type 'GameStatus[]'
   */
  export type ListEnumGameStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GameStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    email?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    isEmailVerified?: BoolFilter<"User"> | boolean
    refreshTokenHash?: StringNullableFilter<"User"> | string | null
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    biography?: StringNullableFilter<"User"> | string | null
    flair?: StringNullableFilter<"User"> | string | null
    country?: StringNullableFilter<"User"> | string | null
    location?: StringNullableFilter<"User"> | string | null
    realName?: StringNullableFilter<"User"> | string | null
    fideRating?: IntNullableFilter<"User"> | number | null
    uscfRating?: IntNullableFilter<"User"> | number | null
    ecfRating?: IntNullableFilter<"User"> | number | null
    rcfRating?: IntNullableFilter<"User"> | number | null
    cfcRating?: IntNullableFilter<"User"> | number | null
    dsbRating?: IntNullableFilter<"User"> | number | null
    socialLinks?: StringNullableFilter<"User"> | string | null
    ratings?: RatingListRelationFilter
    gamesAsWhite?: GameListRelationFilter
    gamesAsBlack?: GameListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    email?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    isEmailVerified?: SortOrder
    refreshTokenHash?: SortOrderInput | SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    biography?: SortOrderInput | SortOrder
    flair?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    realName?: SortOrderInput | SortOrder
    fideRating?: SortOrderInput | SortOrder
    uscfRating?: SortOrderInput | SortOrder
    ecfRating?: SortOrderInput | SortOrder
    rcfRating?: SortOrderInput | SortOrder
    cfcRating?: SortOrderInput | SortOrder
    dsbRating?: SortOrderInput | SortOrder
    socialLinks?: SortOrderInput | SortOrder
    ratings?: RatingOrderByRelationAggregateInput
    gamesAsWhite?: GameOrderByRelationAggregateInput
    gamesAsBlack?: GameOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    passwordHash?: StringFilter<"User"> | string
    isEmailVerified?: BoolFilter<"User"> | boolean
    refreshTokenHash?: StringNullableFilter<"User"> | string | null
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    biography?: StringNullableFilter<"User"> | string | null
    flair?: StringNullableFilter<"User"> | string | null
    country?: StringNullableFilter<"User"> | string | null
    location?: StringNullableFilter<"User"> | string | null
    realName?: StringNullableFilter<"User"> | string | null
    fideRating?: IntNullableFilter<"User"> | number | null
    uscfRating?: IntNullableFilter<"User"> | number | null
    ecfRating?: IntNullableFilter<"User"> | number | null
    rcfRating?: IntNullableFilter<"User"> | number | null
    cfcRating?: IntNullableFilter<"User"> | number | null
    dsbRating?: IntNullableFilter<"User"> | number | null
    socialLinks?: StringNullableFilter<"User"> | string | null
    ratings?: RatingListRelationFilter
    gamesAsWhite?: GameListRelationFilter
    gamesAsBlack?: GameListRelationFilter
  }, "id" | "email" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    email?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    isEmailVerified?: SortOrder
    refreshTokenHash?: SortOrderInput | SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    biography?: SortOrderInput | SortOrder
    flair?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    realName?: SortOrderInput | SortOrder
    fideRating?: SortOrderInput | SortOrder
    uscfRating?: SortOrderInput | SortOrder
    ecfRating?: SortOrderInput | SortOrder
    rcfRating?: SortOrderInput | SortOrder
    cfcRating?: SortOrderInput | SortOrder
    dsbRating?: SortOrderInput | SortOrder
    socialLinks?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    email?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    isEmailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    refreshTokenHash?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    biography?: StringNullableWithAggregatesFilter<"User"> | string | null
    flair?: StringNullableWithAggregatesFilter<"User"> | string | null
    country?: StringNullableWithAggregatesFilter<"User"> | string | null
    location?: StringNullableWithAggregatesFilter<"User"> | string | null
    realName?: StringNullableWithAggregatesFilter<"User"> | string | null
    fideRating?: IntNullableWithAggregatesFilter<"User"> | number | null
    uscfRating?: IntNullableWithAggregatesFilter<"User"> | number | null
    ecfRating?: IntNullableWithAggregatesFilter<"User"> | number | null
    rcfRating?: IntNullableWithAggregatesFilter<"User"> | number | null
    cfcRating?: IntNullableWithAggregatesFilter<"User"> | number | null
    dsbRating?: IntNullableWithAggregatesFilter<"User"> | number | null
    socialLinks?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type RatingWhereInput = {
    AND?: RatingWhereInput | RatingWhereInput[]
    OR?: RatingWhereInput[]
    NOT?: RatingWhereInput | RatingWhereInput[]
    id?: StringFilter<"Rating"> | string
    userId?: StringFilter<"Rating"> | string
    timeControl?: EnumTimeControlFilter<"Rating"> | $Enums.TimeControl
    rating?: IntFilter<"Rating"> | number
    deviation?: FloatFilter<"Rating"> | number
    volatility?: FloatFilter<"Rating"> | number
    updatedAt?: DateTimeFilter<"Rating"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RatingOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    timeControl?: SortOrder
    rating?: SortOrder
    deviation?: SortOrder
    volatility?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type RatingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_timeControl?: RatingUserIdTimeControlCompoundUniqueInput
    AND?: RatingWhereInput | RatingWhereInput[]
    OR?: RatingWhereInput[]
    NOT?: RatingWhereInput | RatingWhereInput[]
    userId?: StringFilter<"Rating"> | string
    timeControl?: EnumTimeControlFilter<"Rating"> | $Enums.TimeControl
    rating?: IntFilter<"Rating"> | number
    deviation?: FloatFilter<"Rating"> | number
    volatility?: FloatFilter<"Rating"> | number
    updatedAt?: DateTimeFilter<"Rating"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_timeControl">

  export type RatingOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    timeControl?: SortOrder
    rating?: SortOrder
    deviation?: SortOrder
    volatility?: SortOrder
    updatedAt?: SortOrder
    _count?: RatingCountOrderByAggregateInput
    _avg?: RatingAvgOrderByAggregateInput
    _max?: RatingMaxOrderByAggregateInput
    _min?: RatingMinOrderByAggregateInput
    _sum?: RatingSumOrderByAggregateInput
  }

  export type RatingScalarWhereWithAggregatesInput = {
    AND?: RatingScalarWhereWithAggregatesInput | RatingScalarWhereWithAggregatesInput[]
    OR?: RatingScalarWhereWithAggregatesInput[]
    NOT?: RatingScalarWhereWithAggregatesInput | RatingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Rating"> | string
    userId?: StringWithAggregatesFilter<"Rating"> | string
    timeControl?: EnumTimeControlWithAggregatesFilter<"Rating"> | $Enums.TimeControl
    rating?: IntWithAggregatesFilter<"Rating"> | number
    deviation?: FloatWithAggregatesFilter<"Rating"> | number
    volatility?: FloatWithAggregatesFilter<"Rating"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"Rating"> | Date | string
  }

  export type GameWhereInput = {
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    id?: StringFilter<"Game"> | string
    createdAt?: DateTimeFilter<"Game"> | Date | string
    timeControl?: EnumTimeControlFilter<"Game"> | $Enums.TimeControl
    status?: EnumGameStatusFilter<"Game"> | $Enums.GameStatus
    whiteUserId?: StringNullableFilter<"Game"> | string | null
    blackUserId?: StringNullableFilter<"Game"> | string | null
    whiteRating?: IntFilter<"Game"> | number
    blackRating?: IntFilter<"Game"> | number
    whiteDeviation?: FloatFilter<"Game"> | number
    blackDeviation?: FloatFilter<"Game"> | number
    whiteVolatility?: FloatFilter<"Game"> | number
    blackVolatility?: FloatFilter<"Game"> | number
    initialFen?: StringFilter<"Game"> | string
    startedAt?: DateTimeNullableFilter<"Game"> | Date | string | null
    abortedAt?: DateTimeNullableFilter<"Game"> | Date | string | null
    whiteUser?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    blackUser?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type GameOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    timeControl?: SortOrder
    status?: SortOrder
    whiteUserId?: SortOrderInput | SortOrder
    blackUserId?: SortOrderInput | SortOrder
    whiteRating?: SortOrder
    blackRating?: SortOrder
    whiteDeviation?: SortOrder
    blackDeviation?: SortOrder
    whiteVolatility?: SortOrder
    blackVolatility?: SortOrder
    initialFen?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    abortedAt?: SortOrderInput | SortOrder
    whiteUser?: UserOrderByWithRelationInput
    blackUser?: UserOrderByWithRelationInput
  }

  export type GameWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    createdAt?: DateTimeFilter<"Game"> | Date | string
    timeControl?: EnumTimeControlFilter<"Game"> | $Enums.TimeControl
    status?: EnumGameStatusFilter<"Game"> | $Enums.GameStatus
    whiteUserId?: StringNullableFilter<"Game"> | string | null
    blackUserId?: StringNullableFilter<"Game"> | string | null
    whiteRating?: IntFilter<"Game"> | number
    blackRating?: IntFilter<"Game"> | number
    whiteDeviation?: FloatFilter<"Game"> | number
    blackDeviation?: FloatFilter<"Game"> | number
    whiteVolatility?: FloatFilter<"Game"> | number
    blackVolatility?: FloatFilter<"Game"> | number
    initialFen?: StringFilter<"Game"> | string
    startedAt?: DateTimeNullableFilter<"Game"> | Date | string | null
    abortedAt?: DateTimeNullableFilter<"Game"> | Date | string | null
    whiteUser?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    blackUser?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type GameOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    timeControl?: SortOrder
    status?: SortOrder
    whiteUserId?: SortOrderInput | SortOrder
    blackUserId?: SortOrderInput | SortOrder
    whiteRating?: SortOrder
    blackRating?: SortOrder
    whiteDeviation?: SortOrder
    blackDeviation?: SortOrder
    whiteVolatility?: SortOrder
    blackVolatility?: SortOrder
    initialFen?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    abortedAt?: SortOrderInput | SortOrder
    _count?: GameCountOrderByAggregateInput
    _avg?: GameAvgOrderByAggregateInput
    _max?: GameMaxOrderByAggregateInput
    _min?: GameMinOrderByAggregateInput
    _sum?: GameSumOrderByAggregateInput
  }

  export type GameScalarWhereWithAggregatesInput = {
    AND?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    OR?: GameScalarWhereWithAggregatesInput[]
    NOT?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Game"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Game"> | Date | string
    timeControl?: EnumTimeControlWithAggregatesFilter<"Game"> | $Enums.TimeControl
    status?: EnumGameStatusWithAggregatesFilter<"Game"> | $Enums.GameStatus
    whiteUserId?: StringNullableWithAggregatesFilter<"Game"> | string | null
    blackUserId?: StringNullableWithAggregatesFilter<"Game"> | string | null
    whiteRating?: IntWithAggregatesFilter<"Game"> | number
    blackRating?: IntWithAggregatesFilter<"Game"> | number
    whiteDeviation?: FloatWithAggregatesFilter<"Game"> | number
    blackDeviation?: FloatWithAggregatesFilter<"Game"> | number
    whiteVolatility?: FloatWithAggregatesFilter<"Game"> | number
    blackVolatility?: FloatWithAggregatesFilter<"Game"> | number
    initialFen?: StringWithAggregatesFilter<"Game"> | string
    startedAt?: DateTimeNullableWithAggregatesFilter<"Game"> | Date | string | null
    abortedAt?: DateTimeNullableWithAggregatesFilter<"Game"> | Date | string | null
  }

  export type UserCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    username: string
    passwordHash: string
    isEmailVerified?: boolean
    refreshTokenHash?: string | null
    lastLoginAt?: Date | string | null
    biography?: string | null
    flair?: string | null
    country?: string | null
    location?: string | null
    realName?: string | null
    fideRating?: number | null
    uscfRating?: number | null
    ecfRating?: number | null
    rcfRating?: number | null
    cfcRating?: number | null
    dsbRating?: number | null
    socialLinks?: string | null
    ratings?: RatingCreateNestedManyWithoutUserInput
    gamesAsWhite?: GameCreateNestedManyWithoutWhiteUserInput
    gamesAsBlack?: GameCreateNestedManyWithoutBlackUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    username: string
    passwordHash: string
    isEmailVerified?: boolean
    refreshTokenHash?: string | null
    lastLoginAt?: Date | string | null
    biography?: string | null
    flair?: string | null
    country?: string | null
    location?: string | null
    realName?: string | null
    fideRating?: number | null
    uscfRating?: number | null
    ecfRating?: number | null
    rcfRating?: number | null
    cfcRating?: number | null
    dsbRating?: number | null
    socialLinks?: string | null
    ratings?: RatingUncheckedCreateNestedManyWithoutUserInput
    gamesAsWhite?: GameUncheckedCreateNestedManyWithoutWhiteUserInput
    gamesAsBlack?: GameUncheckedCreateNestedManyWithoutBlackUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    refreshTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    flair?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    realName?: NullableStringFieldUpdateOperationsInput | string | null
    fideRating?: NullableIntFieldUpdateOperationsInput | number | null
    uscfRating?: NullableIntFieldUpdateOperationsInput | number | null
    ecfRating?: NullableIntFieldUpdateOperationsInput | number | null
    rcfRating?: NullableIntFieldUpdateOperationsInput | number | null
    cfcRating?: NullableIntFieldUpdateOperationsInput | number | null
    dsbRating?: NullableIntFieldUpdateOperationsInput | number | null
    socialLinks?: NullableStringFieldUpdateOperationsInput | string | null
    ratings?: RatingUpdateManyWithoutUserNestedInput
    gamesAsWhite?: GameUpdateManyWithoutWhiteUserNestedInput
    gamesAsBlack?: GameUpdateManyWithoutBlackUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    refreshTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    flair?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    realName?: NullableStringFieldUpdateOperationsInput | string | null
    fideRating?: NullableIntFieldUpdateOperationsInput | number | null
    uscfRating?: NullableIntFieldUpdateOperationsInput | number | null
    ecfRating?: NullableIntFieldUpdateOperationsInput | number | null
    rcfRating?: NullableIntFieldUpdateOperationsInput | number | null
    cfcRating?: NullableIntFieldUpdateOperationsInput | number | null
    dsbRating?: NullableIntFieldUpdateOperationsInput | number | null
    socialLinks?: NullableStringFieldUpdateOperationsInput | string | null
    ratings?: RatingUncheckedUpdateManyWithoutUserNestedInput
    gamesAsWhite?: GameUncheckedUpdateManyWithoutWhiteUserNestedInput
    gamesAsBlack?: GameUncheckedUpdateManyWithoutBlackUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    username: string
    passwordHash: string
    isEmailVerified?: boolean
    refreshTokenHash?: string | null
    lastLoginAt?: Date | string | null
    biography?: string | null
    flair?: string | null
    country?: string | null
    location?: string | null
    realName?: string | null
    fideRating?: number | null
    uscfRating?: number | null
    ecfRating?: number | null
    rcfRating?: number | null
    cfcRating?: number | null
    dsbRating?: number | null
    socialLinks?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    refreshTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    flair?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    realName?: NullableStringFieldUpdateOperationsInput | string | null
    fideRating?: NullableIntFieldUpdateOperationsInput | number | null
    uscfRating?: NullableIntFieldUpdateOperationsInput | number | null
    ecfRating?: NullableIntFieldUpdateOperationsInput | number | null
    rcfRating?: NullableIntFieldUpdateOperationsInput | number | null
    cfcRating?: NullableIntFieldUpdateOperationsInput | number | null
    dsbRating?: NullableIntFieldUpdateOperationsInput | number | null
    socialLinks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    refreshTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    flair?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    realName?: NullableStringFieldUpdateOperationsInput | string | null
    fideRating?: NullableIntFieldUpdateOperationsInput | number | null
    uscfRating?: NullableIntFieldUpdateOperationsInput | number | null
    ecfRating?: NullableIntFieldUpdateOperationsInput | number | null
    rcfRating?: NullableIntFieldUpdateOperationsInput | number | null
    cfcRating?: NullableIntFieldUpdateOperationsInput | number | null
    dsbRating?: NullableIntFieldUpdateOperationsInput | number | null
    socialLinks?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RatingCreateInput = {
    id?: string
    timeControl: $Enums.TimeControl
    rating: number
    deviation: number
    volatility: number
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutRatingsInput
  }

  export type RatingUncheckedCreateInput = {
    id?: string
    userId: string
    timeControl: $Enums.TimeControl
    rating: number
    deviation: number
    volatility: number
    updatedAt?: Date | string
  }

  export type RatingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    timeControl?: EnumTimeControlFieldUpdateOperationsInput | $Enums.TimeControl
    rating?: IntFieldUpdateOperationsInput | number
    deviation?: FloatFieldUpdateOperationsInput | number
    volatility?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRatingsNestedInput
  }

  export type RatingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    timeControl?: EnumTimeControlFieldUpdateOperationsInput | $Enums.TimeControl
    rating?: IntFieldUpdateOperationsInput | number
    deviation?: FloatFieldUpdateOperationsInput | number
    volatility?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingCreateManyInput = {
    id?: string
    userId: string
    timeControl: $Enums.TimeControl
    rating: number
    deviation: number
    volatility: number
    updatedAt?: Date | string
  }

  export type RatingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    timeControl?: EnumTimeControlFieldUpdateOperationsInput | $Enums.TimeControl
    rating?: IntFieldUpdateOperationsInput | number
    deviation?: FloatFieldUpdateOperationsInput | number
    volatility?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    timeControl?: EnumTimeControlFieldUpdateOperationsInput | $Enums.TimeControl
    rating?: IntFieldUpdateOperationsInput | number
    deviation?: FloatFieldUpdateOperationsInput | number
    volatility?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameCreateInput = {
    id?: string
    createdAt?: Date | string
    timeControl: $Enums.TimeControl
    status?: $Enums.GameStatus
    whiteRating: number
    blackRating: number
    whiteDeviation: number
    blackDeviation: number
    whiteVolatility: number
    blackVolatility: number
    initialFen: string
    startedAt?: Date | string | null
    abortedAt?: Date | string | null
    whiteUser?: UserCreateNestedOneWithoutGamesAsWhiteInput
    blackUser?: UserCreateNestedOneWithoutGamesAsBlackInput
  }

  export type GameUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    timeControl: $Enums.TimeControl
    status?: $Enums.GameStatus
    whiteUserId?: string | null
    blackUserId?: string | null
    whiteRating: number
    blackRating: number
    whiteDeviation: number
    blackDeviation: number
    whiteVolatility: number
    blackVolatility: number
    initialFen: string
    startedAt?: Date | string | null
    abortedAt?: Date | string | null
  }

  export type GameUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeControl?: EnumTimeControlFieldUpdateOperationsInput | $Enums.TimeControl
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    whiteRating?: IntFieldUpdateOperationsInput | number
    blackRating?: IntFieldUpdateOperationsInput | number
    whiteDeviation?: FloatFieldUpdateOperationsInput | number
    blackDeviation?: FloatFieldUpdateOperationsInput | number
    whiteVolatility?: FloatFieldUpdateOperationsInput | number
    blackVolatility?: FloatFieldUpdateOperationsInput | number
    initialFen?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    whiteUser?: UserUpdateOneWithoutGamesAsWhiteNestedInput
    blackUser?: UserUpdateOneWithoutGamesAsBlackNestedInput
  }

  export type GameUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeControl?: EnumTimeControlFieldUpdateOperationsInput | $Enums.TimeControl
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    whiteUserId?: NullableStringFieldUpdateOperationsInput | string | null
    blackUserId?: NullableStringFieldUpdateOperationsInput | string | null
    whiteRating?: IntFieldUpdateOperationsInput | number
    blackRating?: IntFieldUpdateOperationsInput | number
    whiteDeviation?: FloatFieldUpdateOperationsInput | number
    blackDeviation?: FloatFieldUpdateOperationsInput | number
    whiteVolatility?: FloatFieldUpdateOperationsInput | number
    blackVolatility?: FloatFieldUpdateOperationsInput | number
    initialFen?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GameCreateManyInput = {
    id?: string
    createdAt?: Date | string
    timeControl: $Enums.TimeControl
    status?: $Enums.GameStatus
    whiteUserId?: string | null
    blackUserId?: string | null
    whiteRating: number
    blackRating: number
    whiteDeviation: number
    blackDeviation: number
    whiteVolatility: number
    blackVolatility: number
    initialFen: string
    startedAt?: Date | string | null
    abortedAt?: Date | string | null
  }

  export type GameUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeControl?: EnumTimeControlFieldUpdateOperationsInput | $Enums.TimeControl
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    whiteRating?: IntFieldUpdateOperationsInput | number
    blackRating?: IntFieldUpdateOperationsInput | number
    whiteDeviation?: FloatFieldUpdateOperationsInput | number
    blackDeviation?: FloatFieldUpdateOperationsInput | number
    whiteVolatility?: FloatFieldUpdateOperationsInput | number
    blackVolatility?: FloatFieldUpdateOperationsInput | number
    initialFen?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GameUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeControl?: EnumTimeControlFieldUpdateOperationsInput | $Enums.TimeControl
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    whiteUserId?: NullableStringFieldUpdateOperationsInput | string | null
    blackUserId?: NullableStringFieldUpdateOperationsInput | string | null
    whiteRating?: IntFieldUpdateOperationsInput | number
    blackRating?: IntFieldUpdateOperationsInput | number
    whiteDeviation?: FloatFieldUpdateOperationsInput | number
    blackDeviation?: FloatFieldUpdateOperationsInput | number
    whiteVolatility?: FloatFieldUpdateOperationsInput | number
    blackVolatility?: FloatFieldUpdateOperationsInput | number
    initialFen?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type RatingListRelationFilter = {
    every?: RatingWhereInput
    some?: RatingWhereInput
    none?: RatingWhereInput
  }

  export type GameListRelationFilter = {
    every?: GameWhereInput
    some?: GameWhereInput
    none?: GameWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RatingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GameOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    email?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    isEmailVerified?: SortOrder
    refreshTokenHash?: SortOrder
    lastLoginAt?: SortOrder
    biography?: SortOrder
    flair?: SortOrder
    country?: SortOrder
    location?: SortOrder
    realName?: SortOrder
    fideRating?: SortOrder
    uscfRating?: SortOrder
    ecfRating?: SortOrder
    rcfRating?: SortOrder
    cfcRating?: SortOrder
    dsbRating?: SortOrder
    socialLinks?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    fideRating?: SortOrder
    uscfRating?: SortOrder
    ecfRating?: SortOrder
    rcfRating?: SortOrder
    cfcRating?: SortOrder
    dsbRating?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    email?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    isEmailVerified?: SortOrder
    refreshTokenHash?: SortOrder
    lastLoginAt?: SortOrder
    biography?: SortOrder
    flair?: SortOrder
    country?: SortOrder
    location?: SortOrder
    realName?: SortOrder
    fideRating?: SortOrder
    uscfRating?: SortOrder
    ecfRating?: SortOrder
    rcfRating?: SortOrder
    cfcRating?: SortOrder
    dsbRating?: SortOrder
    socialLinks?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    email?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    isEmailVerified?: SortOrder
    refreshTokenHash?: SortOrder
    lastLoginAt?: SortOrder
    biography?: SortOrder
    flair?: SortOrder
    country?: SortOrder
    location?: SortOrder
    realName?: SortOrder
    fideRating?: SortOrder
    uscfRating?: SortOrder
    ecfRating?: SortOrder
    rcfRating?: SortOrder
    cfcRating?: SortOrder
    dsbRating?: SortOrder
    socialLinks?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    fideRating?: SortOrder
    uscfRating?: SortOrder
    ecfRating?: SortOrder
    rcfRating?: SortOrder
    cfcRating?: SortOrder
    dsbRating?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumTimeControlFilter<$PrismaModel = never> = {
    equals?: $Enums.TimeControl | EnumTimeControlFieldRefInput<$PrismaModel>
    in?: $Enums.TimeControl[] | ListEnumTimeControlFieldRefInput<$PrismaModel>
    notIn?: $Enums.TimeControl[] | ListEnumTimeControlFieldRefInput<$PrismaModel>
    not?: NestedEnumTimeControlFilter<$PrismaModel> | $Enums.TimeControl
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type RatingUserIdTimeControlCompoundUniqueInput = {
    userId: string
    timeControl: $Enums.TimeControl
  }

  export type RatingCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    timeControl?: SortOrder
    rating?: SortOrder
    deviation?: SortOrder
    volatility?: SortOrder
    updatedAt?: SortOrder
  }

  export type RatingAvgOrderByAggregateInput = {
    rating?: SortOrder
    deviation?: SortOrder
    volatility?: SortOrder
  }

  export type RatingMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    timeControl?: SortOrder
    rating?: SortOrder
    deviation?: SortOrder
    volatility?: SortOrder
    updatedAt?: SortOrder
  }

  export type RatingMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    timeControl?: SortOrder
    rating?: SortOrder
    deviation?: SortOrder
    volatility?: SortOrder
    updatedAt?: SortOrder
  }

  export type RatingSumOrderByAggregateInput = {
    rating?: SortOrder
    deviation?: SortOrder
    volatility?: SortOrder
  }

  export type EnumTimeControlWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TimeControl | EnumTimeControlFieldRefInput<$PrismaModel>
    in?: $Enums.TimeControl[] | ListEnumTimeControlFieldRefInput<$PrismaModel>
    notIn?: $Enums.TimeControl[] | ListEnumTimeControlFieldRefInput<$PrismaModel>
    not?: NestedEnumTimeControlWithAggregatesFilter<$PrismaModel> | $Enums.TimeControl
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTimeControlFilter<$PrismaModel>
    _max?: NestedEnumTimeControlFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumGameStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.GameStatus | EnumGameStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGameStatusFilter<$PrismaModel> | $Enums.GameStatus
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type GameCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    timeControl?: SortOrder
    status?: SortOrder
    whiteUserId?: SortOrder
    blackUserId?: SortOrder
    whiteRating?: SortOrder
    blackRating?: SortOrder
    whiteDeviation?: SortOrder
    blackDeviation?: SortOrder
    whiteVolatility?: SortOrder
    blackVolatility?: SortOrder
    initialFen?: SortOrder
    startedAt?: SortOrder
    abortedAt?: SortOrder
  }

  export type GameAvgOrderByAggregateInput = {
    whiteRating?: SortOrder
    blackRating?: SortOrder
    whiteDeviation?: SortOrder
    blackDeviation?: SortOrder
    whiteVolatility?: SortOrder
    blackVolatility?: SortOrder
  }

  export type GameMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    timeControl?: SortOrder
    status?: SortOrder
    whiteUserId?: SortOrder
    blackUserId?: SortOrder
    whiteRating?: SortOrder
    blackRating?: SortOrder
    whiteDeviation?: SortOrder
    blackDeviation?: SortOrder
    whiteVolatility?: SortOrder
    blackVolatility?: SortOrder
    initialFen?: SortOrder
    startedAt?: SortOrder
    abortedAt?: SortOrder
  }

  export type GameMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    timeControl?: SortOrder
    status?: SortOrder
    whiteUserId?: SortOrder
    blackUserId?: SortOrder
    whiteRating?: SortOrder
    blackRating?: SortOrder
    whiteDeviation?: SortOrder
    blackDeviation?: SortOrder
    whiteVolatility?: SortOrder
    blackVolatility?: SortOrder
    initialFen?: SortOrder
    startedAt?: SortOrder
    abortedAt?: SortOrder
  }

  export type GameSumOrderByAggregateInput = {
    whiteRating?: SortOrder
    blackRating?: SortOrder
    whiteDeviation?: SortOrder
    blackDeviation?: SortOrder
    whiteVolatility?: SortOrder
    blackVolatility?: SortOrder
  }

  export type EnumGameStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GameStatus | EnumGameStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGameStatusWithAggregatesFilter<$PrismaModel> | $Enums.GameStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGameStatusFilter<$PrismaModel>
    _max?: NestedEnumGameStatusFilter<$PrismaModel>
  }

  export type RatingCreateNestedManyWithoutUserInput = {
    create?: XOR<RatingCreateWithoutUserInput, RatingUncheckedCreateWithoutUserInput> | RatingCreateWithoutUserInput[] | RatingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutUserInput | RatingCreateOrConnectWithoutUserInput[]
    createMany?: RatingCreateManyUserInputEnvelope
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
  }

  export type GameCreateNestedManyWithoutWhiteUserInput = {
    create?: XOR<GameCreateWithoutWhiteUserInput, GameUncheckedCreateWithoutWhiteUserInput> | GameCreateWithoutWhiteUserInput[] | GameUncheckedCreateWithoutWhiteUserInput[]
    connectOrCreate?: GameCreateOrConnectWithoutWhiteUserInput | GameCreateOrConnectWithoutWhiteUserInput[]
    createMany?: GameCreateManyWhiteUserInputEnvelope
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
  }

  export type GameCreateNestedManyWithoutBlackUserInput = {
    create?: XOR<GameCreateWithoutBlackUserInput, GameUncheckedCreateWithoutBlackUserInput> | GameCreateWithoutBlackUserInput[] | GameUncheckedCreateWithoutBlackUserInput[]
    connectOrCreate?: GameCreateOrConnectWithoutBlackUserInput | GameCreateOrConnectWithoutBlackUserInput[]
    createMany?: GameCreateManyBlackUserInputEnvelope
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
  }

  export type RatingUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RatingCreateWithoutUserInput, RatingUncheckedCreateWithoutUserInput> | RatingCreateWithoutUserInput[] | RatingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutUserInput | RatingCreateOrConnectWithoutUserInput[]
    createMany?: RatingCreateManyUserInputEnvelope
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
  }

  export type GameUncheckedCreateNestedManyWithoutWhiteUserInput = {
    create?: XOR<GameCreateWithoutWhiteUserInput, GameUncheckedCreateWithoutWhiteUserInput> | GameCreateWithoutWhiteUserInput[] | GameUncheckedCreateWithoutWhiteUserInput[]
    connectOrCreate?: GameCreateOrConnectWithoutWhiteUserInput | GameCreateOrConnectWithoutWhiteUserInput[]
    createMany?: GameCreateManyWhiteUserInputEnvelope
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
  }

  export type GameUncheckedCreateNestedManyWithoutBlackUserInput = {
    create?: XOR<GameCreateWithoutBlackUserInput, GameUncheckedCreateWithoutBlackUserInput> | GameCreateWithoutBlackUserInput[] | GameUncheckedCreateWithoutBlackUserInput[]
    connectOrCreate?: GameCreateOrConnectWithoutBlackUserInput | GameCreateOrConnectWithoutBlackUserInput[]
    createMany?: GameCreateManyBlackUserInputEnvelope
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type RatingUpdateManyWithoutUserNestedInput = {
    create?: XOR<RatingCreateWithoutUserInput, RatingUncheckedCreateWithoutUserInput> | RatingCreateWithoutUserInput[] | RatingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutUserInput | RatingCreateOrConnectWithoutUserInput[]
    upsert?: RatingUpsertWithWhereUniqueWithoutUserInput | RatingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RatingCreateManyUserInputEnvelope
    set?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    disconnect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    delete?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    update?: RatingUpdateWithWhereUniqueWithoutUserInput | RatingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RatingUpdateManyWithWhereWithoutUserInput | RatingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RatingScalarWhereInput | RatingScalarWhereInput[]
  }

  export type GameUpdateManyWithoutWhiteUserNestedInput = {
    create?: XOR<GameCreateWithoutWhiteUserInput, GameUncheckedCreateWithoutWhiteUserInput> | GameCreateWithoutWhiteUserInput[] | GameUncheckedCreateWithoutWhiteUserInput[]
    connectOrCreate?: GameCreateOrConnectWithoutWhiteUserInput | GameCreateOrConnectWithoutWhiteUserInput[]
    upsert?: GameUpsertWithWhereUniqueWithoutWhiteUserInput | GameUpsertWithWhereUniqueWithoutWhiteUserInput[]
    createMany?: GameCreateManyWhiteUserInputEnvelope
    set?: GameWhereUniqueInput | GameWhereUniqueInput[]
    disconnect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    delete?: GameWhereUniqueInput | GameWhereUniqueInput[]
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    update?: GameUpdateWithWhereUniqueWithoutWhiteUserInput | GameUpdateWithWhereUniqueWithoutWhiteUserInput[]
    updateMany?: GameUpdateManyWithWhereWithoutWhiteUserInput | GameUpdateManyWithWhereWithoutWhiteUserInput[]
    deleteMany?: GameScalarWhereInput | GameScalarWhereInput[]
  }

  export type GameUpdateManyWithoutBlackUserNestedInput = {
    create?: XOR<GameCreateWithoutBlackUserInput, GameUncheckedCreateWithoutBlackUserInput> | GameCreateWithoutBlackUserInput[] | GameUncheckedCreateWithoutBlackUserInput[]
    connectOrCreate?: GameCreateOrConnectWithoutBlackUserInput | GameCreateOrConnectWithoutBlackUserInput[]
    upsert?: GameUpsertWithWhereUniqueWithoutBlackUserInput | GameUpsertWithWhereUniqueWithoutBlackUserInput[]
    createMany?: GameCreateManyBlackUserInputEnvelope
    set?: GameWhereUniqueInput | GameWhereUniqueInput[]
    disconnect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    delete?: GameWhereUniqueInput | GameWhereUniqueInput[]
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    update?: GameUpdateWithWhereUniqueWithoutBlackUserInput | GameUpdateWithWhereUniqueWithoutBlackUserInput[]
    updateMany?: GameUpdateManyWithWhereWithoutBlackUserInput | GameUpdateManyWithWhereWithoutBlackUserInput[]
    deleteMany?: GameScalarWhereInput | GameScalarWhereInput[]
  }

  export type RatingUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RatingCreateWithoutUserInput, RatingUncheckedCreateWithoutUserInput> | RatingCreateWithoutUserInput[] | RatingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutUserInput | RatingCreateOrConnectWithoutUserInput[]
    upsert?: RatingUpsertWithWhereUniqueWithoutUserInput | RatingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RatingCreateManyUserInputEnvelope
    set?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    disconnect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    delete?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    update?: RatingUpdateWithWhereUniqueWithoutUserInput | RatingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RatingUpdateManyWithWhereWithoutUserInput | RatingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RatingScalarWhereInput | RatingScalarWhereInput[]
  }

  export type GameUncheckedUpdateManyWithoutWhiteUserNestedInput = {
    create?: XOR<GameCreateWithoutWhiteUserInput, GameUncheckedCreateWithoutWhiteUserInput> | GameCreateWithoutWhiteUserInput[] | GameUncheckedCreateWithoutWhiteUserInput[]
    connectOrCreate?: GameCreateOrConnectWithoutWhiteUserInput | GameCreateOrConnectWithoutWhiteUserInput[]
    upsert?: GameUpsertWithWhereUniqueWithoutWhiteUserInput | GameUpsertWithWhereUniqueWithoutWhiteUserInput[]
    createMany?: GameCreateManyWhiteUserInputEnvelope
    set?: GameWhereUniqueInput | GameWhereUniqueInput[]
    disconnect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    delete?: GameWhereUniqueInput | GameWhereUniqueInput[]
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    update?: GameUpdateWithWhereUniqueWithoutWhiteUserInput | GameUpdateWithWhereUniqueWithoutWhiteUserInput[]
    updateMany?: GameUpdateManyWithWhereWithoutWhiteUserInput | GameUpdateManyWithWhereWithoutWhiteUserInput[]
    deleteMany?: GameScalarWhereInput | GameScalarWhereInput[]
  }

  export type GameUncheckedUpdateManyWithoutBlackUserNestedInput = {
    create?: XOR<GameCreateWithoutBlackUserInput, GameUncheckedCreateWithoutBlackUserInput> | GameCreateWithoutBlackUserInput[] | GameUncheckedCreateWithoutBlackUserInput[]
    connectOrCreate?: GameCreateOrConnectWithoutBlackUserInput | GameCreateOrConnectWithoutBlackUserInput[]
    upsert?: GameUpsertWithWhereUniqueWithoutBlackUserInput | GameUpsertWithWhereUniqueWithoutBlackUserInput[]
    createMany?: GameCreateManyBlackUserInputEnvelope
    set?: GameWhereUniqueInput | GameWhereUniqueInput[]
    disconnect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    delete?: GameWhereUniqueInput | GameWhereUniqueInput[]
    connect?: GameWhereUniqueInput | GameWhereUniqueInput[]
    update?: GameUpdateWithWhereUniqueWithoutBlackUserInput | GameUpdateWithWhereUniqueWithoutBlackUserInput[]
    updateMany?: GameUpdateManyWithWhereWithoutBlackUserInput | GameUpdateManyWithWhereWithoutBlackUserInput[]
    deleteMany?: GameScalarWhereInput | GameScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutRatingsInput = {
    create?: XOR<UserCreateWithoutRatingsInput, UserUncheckedCreateWithoutRatingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRatingsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumTimeControlFieldUpdateOperationsInput = {
    set?: $Enums.TimeControl
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutRatingsNestedInput = {
    create?: XOR<UserCreateWithoutRatingsInput, UserUncheckedCreateWithoutRatingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRatingsInput
    upsert?: UserUpsertWithoutRatingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRatingsInput, UserUpdateWithoutRatingsInput>, UserUncheckedUpdateWithoutRatingsInput>
  }

  export type UserCreateNestedOneWithoutGamesAsWhiteInput = {
    create?: XOR<UserCreateWithoutGamesAsWhiteInput, UserUncheckedCreateWithoutGamesAsWhiteInput>
    connectOrCreate?: UserCreateOrConnectWithoutGamesAsWhiteInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutGamesAsBlackInput = {
    create?: XOR<UserCreateWithoutGamesAsBlackInput, UserUncheckedCreateWithoutGamesAsBlackInput>
    connectOrCreate?: UserCreateOrConnectWithoutGamesAsBlackInput
    connect?: UserWhereUniqueInput
  }

  export type EnumGameStatusFieldUpdateOperationsInput = {
    set?: $Enums.GameStatus
  }

  export type UserUpdateOneWithoutGamesAsWhiteNestedInput = {
    create?: XOR<UserCreateWithoutGamesAsWhiteInput, UserUncheckedCreateWithoutGamesAsWhiteInput>
    connectOrCreate?: UserCreateOrConnectWithoutGamesAsWhiteInput
    upsert?: UserUpsertWithoutGamesAsWhiteInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGamesAsWhiteInput, UserUpdateWithoutGamesAsWhiteInput>, UserUncheckedUpdateWithoutGamesAsWhiteInput>
  }

  export type UserUpdateOneWithoutGamesAsBlackNestedInput = {
    create?: XOR<UserCreateWithoutGamesAsBlackInput, UserUncheckedCreateWithoutGamesAsBlackInput>
    connectOrCreate?: UserCreateOrConnectWithoutGamesAsBlackInput
    upsert?: UserUpsertWithoutGamesAsBlackInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGamesAsBlackInput, UserUpdateWithoutGamesAsBlackInput>, UserUncheckedUpdateWithoutGamesAsBlackInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumTimeControlFilter<$PrismaModel = never> = {
    equals?: $Enums.TimeControl | EnumTimeControlFieldRefInput<$PrismaModel>
    in?: $Enums.TimeControl[] | ListEnumTimeControlFieldRefInput<$PrismaModel>
    notIn?: $Enums.TimeControl[] | ListEnumTimeControlFieldRefInput<$PrismaModel>
    not?: NestedEnumTimeControlFilter<$PrismaModel> | $Enums.TimeControl
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumTimeControlWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TimeControl | EnumTimeControlFieldRefInput<$PrismaModel>
    in?: $Enums.TimeControl[] | ListEnumTimeControlFieldRefInput<$PrismaModel>
    notIn?: $Enums.TimeControl[] | ListEnumTimeControlFieldRefInput<$PrismaModel>
    not?: NestedEnumTimeControlWithAggregatesFilter<$PrismaModel> | $Enums.TimeControl
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTimeControlFilter<$PrismaModel>
    _max?: NestedEnumTimeControlFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumGameStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.GameStatus | EnumGameStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGameStatusFilter<$PrismaModel> | $Enums.GameStatus
  }

  export type NestedEnumGameStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GameStatus | EnumGameStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GameStatus[] | ListEnumGameStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGameStatusWithAggregatesFilter<$PrismaModel> | $Enums.GameStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGameStatusFilter<$PrismaModel>
    _max?: NestedEnumGameStatusFilter<$PrismaModel>
  }

  export type RatingCreateWithoutUserInput = {
    id?: string
    timeControl: $Enums.TimeControl
    rating: number
    deviation: number
    volatility: number
    updatedAt?: Date | string
  }

  export type RatingUncheckedCreateWithoutUserInput = {
    id?: string
    timeControl: $Enums.TimeControl
    rating: number
    deviation: number
    volatility: number
    updatedAt?: Date | string
  }

  export type RatingCreateOrConnectWithoutUserInput = {
    where: RatingWhereUniqueInput
    create: XOR<RatingCreateWithoutUserInput, RatingUncheckedCreateWithoutUserInput>
  }

  export type RatingCreateManyUserInputEnvelope = {
    data: RatingCreateManyUserInput | RatingCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type GameCreateWithoutWhiteUserInput = {
    id?: string
    createdAt?: Date | string
    timeControl: $Enums.TimeControl
    status?: $Enums.GameStatus
    whiteRating: number
    blackRating: number
    whiteDeviation: number
    blackDeviation: number
    whiteVolatility: number
    blackVolatility: number
    initialFen: string
    startedAt?: Date | string | null
    abortedAt?: Date | string | null
    blackUser?: UserCreateNestedOneWithoutGamesAsBlackInput
  }

  export type GameUncheckedCreateWithoutWhiteUserInput = {
    id?: string
    createdAt?: Date | string
    timeControl: $Enums.TimeControl
    status?: $Enums.GameStatus
    blackUserId?: string | null
    whiteRating: number
    blackRating: number
    whiteDeviation: number
    blackDeviation: number
    whiteVolatility: number
    blackVolatility: number
    initialFen: string
    startedAt?: Date | string | null
    abortedAt?: Date | string | null
  }

  export type GameCreateOrConnectWithoutWhiteUserInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutWhiteUserInput, GameUncheckedCreateWithoutWhiteUserInput>
  }

  export type GameCreateManyWhiteUserInputEnvelope = {
    data: GameCreateManyWhiteUserInput | GameCreateManyWhiteUserInput[]
    skipDuplicates?: boolean
  }

  export type GameCreateWithoutBlackUserInput = {
    id?: string
    createdAt?: Date | string
    timeControl: $Enums.TimeControl
    status?: $Enums.GameStatus
    whiteRating: number
    blackRating: number
    whiteDeviation: number
    blackDeviation: number
    whiteVolatility: number
    blackVolatility: number
    initialFen: string
    startedAt?: Date | string | null
    abortedAt?: Date | string | null
    whiteUser?: UserCreateNestedOneWithoutGamesAsWhiteInput
  }

  export type GameUncheckedCreateWithoutBlackUserInput = {
    id?: string
    createdAt?: Date | string
    timeControl: $Enums.TimeControl
    status?: $Enums.GameStatus
    whiteUserId?: string | null
    whiteRating: number
    blackRating: number
    whiteDeviation: number
    blackDeviation: number
    whiteVolatility: number
    blackVolatility: number
    initialFen: string
    startedAt?: Date | string | null
    abortedAt?: Date | string | null
  }

  export type GameCreateOrConnectWithoutBlackUserInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutBlackUserInput, GameUncheckedCreateWithoutBlackUserInput>
  }

  export type GameCreateManyBlackUserInputEnvelope = {
    data: GameCreateManyBlackUserInput | GameCreateManyBlackUserInput[]
    skipDuplicates?: boolean
  }

  export type RatingUpsertWithWhereUniqueWithoutUserInput = {
    where: RatingWhereUniqueInput
    update: XOR<RatingUpdateWithoutUserInput, RatingUncheckedUpdateWithoutUserInput>
    create: XOR<RatingCreateWithoutUserInput, RatingUncheckedCreateWithoutUserInput>
  }

  export type RatingUpdateWithWhereUniqueWithoutUserInput = {
    where: RatingWhereUniqueInput
    data: XOR<RatingUpdateWithoutUserInput, RatingUncheckedUpdateWithoutUserInput>
  }

  export type RatingUpdateManyWithWhereWithoutUserInput = {
    where: RatingScalarWhereInput
    data: XOR<RatingUpdateManyMutationInput, RatingUncheckedUpdateManyWithoutUserInput>
  }

  export type RatingScalarWhereInput = {
    AND?: RatingScalarWhereInput | RatingScalarWhereInput[]
    OR?: RatingScalarWhereInput[]
    NOT?: RatingScalarWhereInput | RatingScalarWhereInput[]
    id?: StringFilter<"Rating"> | string
    userId?: StringFilter<"Rating"> | string
    timeControl?: EnumTimeControlFilter<"Rating"> | $Enums.TimeControl
    rating?: IntFilter<"Rating"> | number
    deviation?: FloatFilter<"Rating"> | number
    volatility?: FloatFilter<"Rating"> | number
    updatedAt?: DateTimeFilter<"Rating"> | Date | string
  }

  export type GameUpsertWithWhereUniqueWithoutWhiteUserInput = {
    where: GameWhereUniqueInput
    update: XOR<GameUpdateWithoutWhiteUserInput, GameUncheckedUpdateWithoutWhiteUserInput>
    create: XOR<GameCreateWithoutWhiteUserInput, GameUncheckedCreateWithoutWhiteUserInput>
  }

  export type GameUpdateWithWhereUniqueWithoutWhiteUserInput = {
    where: GameWhereUniqueInput
    data: XOR<GameUpdateWithoutWhiteUserInput, GameUncheckedUpdateWithoutWhiteUserInput>
  }

  export type GameUpdateManyWithWhereWithoutWhiteUserInput = {
    where: GameScalarWhereInput
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyWithoutWhiteUserInput>
  }

  export type GameScalarWhereInput = {
    AND?: GameScalarWhereInput | GameScalarWhereInput[]
    OR?: GameScalarWhereInput[]
    NOT?: GameScalarWhereInput | GameScalarWhereInput[]
    id?: StringFilter<"Game"> | string
    createdAt?: DateTimeFilter<"Game"> | Date | string
    timeControl?: EnumTimeControlFilter<"Game"> | $Enums.TimeControl
    status?: EnumGameStatusFilter<"Game"> | $Enums.GameStatus
    whiteUserId?: StringNullableFilter<"Game"> | string | null
    blackUserId?: StringNullableFilter<"Game"> | string | null
    whiteRating?: IntFilter<"Game"> | number
    blackRating?: IntFilter<"Game"> | number
    whiteDeviation?: FloatFilter<"Game"> | number
    blackDeviation?: FloatFilter<"Game"> | number
    whiteVolatility?: FloatFilter<"Game"> | number
    blackVolatility?: FloatFilter<"Game"> | number
    initialFen?: StringFilter<"Game"> | string
    startedAt?: DateTimeNullableFilter<"Game"> | Date | string | null
    abortedAt?: DateTimeNullableFilter<"Game"> | Date | string | null
  }

  export type GameUpsertWithWhereUniqueWithoutBlackUserInput = {
    where: GameWhereUniqueInput
    update: XOR<GameUpdateWithoutBlackUserInput, GameUncheckedUpdateWithoutBlackUserInput>
    create: XOR<GameCreateWithoutBlackUserInput, GameUncheckedCreateWithoutBlackUserInput>
  }

  export type GameUpdateWithWhereUniqueWithoutBlackUserInput = {
    where: GameWhereUniqueInput
    data: XOR<GameUpdateWithoutBlackUserInput, GameUncheckedUpdateWithoutBlackUserInput>
  }

  export type GameUpdateManyWithWhereWithoutBlackUserInput = {
    where: GameScalarWhereInput
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyWithoutBlackUserInput>
  }

  export type UserCreateWithoutRatingsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    username: string
    passwordHash: string
    isEmailVerified?: boolean
    refreshTokenHash?: string | null
    lastLoginAt?: Date | string | null
    biography?: string | null
    flair?: string | null
    country?: string | null
    location?: string | null
    realName?: string | null
    fideRating?: number | null
    uscfRating?: number | null
    ecfRating?: number | null
    rcfRating?: number | null
    cfcRating?: number | null
    dsbRating?: number | null
    socialLinks?: string | null
    gamesAsWhite?: GameCreateNestedManyWithoutWhiteUserInput
    gamesAsBlack?: GameCreateNestedManyWithoutBlackUserInput
  }

  export type UserUncheckedCreateWithoutRatingsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    username: string
    passwordHash: string
    isEmailVerified?: boolean
    refreshTokenHash?: string | null
    lastLoginAt?: Date | string | null
    biography?: string | null
    flair?: string | null
    country?: string | null
    location?: string | null
    realName?: string | null
    fideRating?: number | null
    uscfRating?: number | null
    ecfRating?: number | null
    rcfRating?: number | null
    cfcRating?: number | null
    dsbRating?: number | null
    socialLinks?: string | null
    gamesAsWhite?: GameUncheckedCreateNestedManyWithoutWhiteUserInput
    gamesAsBlack?: GameUncheckedCreateNestedManyWithoutBlackUserInput
  }

  export type UserCreateOrConnectWithoutRatingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRatingsInput, UserUncheckedCreateWithoutRatingsInput>
  }

  export type UserUpsertWithoutRatingsInput = {
    update: XOR<UserUpdateWithoutRatingsInput, UserUncheckedUpdateWithoutRatingsInput>
    create: XOR<UserCreateWithoutRatingsInput, UserUncheckedCreateWithoutRatingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRatingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRatingsInput, UserUncheckedUpdateWithoutRatingsInput>
  }

  export type UserUpdateWithoutRatingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    refreshTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    flair?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    realName?: NullableStringFieldUpdateOperationsInput | string | null
    fideRating?: NullableIntFieldUpdateOperationsInput | number | null
    uscfRating?: NullableIntFieldUpdateOperationsInput | number | null
    ecfRating?: NullableIntFieldUpdateOperationsInput | number | null
    rcfRating?: NullableIntFieldUpdateOperationsInput | number | null
    cfcRating?: NullableIntFieldUpdateOperationsInput | number | null
    dsbRating?: NullableIntFieldUpdateOperationsInput | number | null
    socialLinks?: NullableStringFieldUpdateOperationsInput | string | null
    gamesAsWhite?: GameUpdateManyWithoutWhiteUserNestedInput
    gamesAsBlack?: GameUpdateManyWithoutBlackUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRatingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    refreshTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    flair?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    realName?: NullableStringFieldUpdateOperationsInput | string | null
    fideRating?: NullableIntFieldUpdateOperationsInput | number | null
    uscfRating?: NullableIntFieldUpdateOperationsInput | number | null
    ecfRating?: NullableIntFieldUpdateOperationsInput | number | null
    rcfRating?: NullableIntFieldUpdateOperationsInput | number | null
    cfcRating?: NullableIntFieldUpdateOperationsInput | number | null
    dsbRating?: NullableIntFieldUpdateOperationsInput | number | null
    socialLinks?: NullableStringFieldUpdateOperationsInput | string | null
    gamesAsWhite?: GameUncheckedUpdateManyWithoutWhiteUserNestedInput
    gamesAsBlack?: GameUncheckedUpdateManyWithoutBlackUserNestedInput
  }

  export type UserCreateWithoutGamesAsWhiteInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    username: string
    passwordHash: string
    isEmailVerified?: boolean
    refreshTokenHash?: string | null
    lastLoginAt?: Date | string | null
    biography?: string | null
    flair?: string | null
    country?: string | null
    location?: string | null
    realName?: string | null
    fideRating?: number | null
    uscfRating?: number | null
    ecfRating?: number | null
    rcfRating?: number | null
    cfcRating?: number | null
    dsbRating?: number | null
    socialLinks?: string | null
    ratings?: RatingCreateNestedManyWithoutUserInput
    gamesAsBlack?: GameCreateNestedManyWithoutBlackUserInput
  }

  export type UserUncheckedCreateWithoutGamesAsWhiteInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    username: string
    passwordHash: string
    isEmailVerified?: boolean
    refreshTokenHash?: string | null
    lastLoginAt?: Date | string | null
    biography?: string | null
    flair?: string | null
    country?: string | null
    location?: string | null
    realName?: string | null
    fideRating?: number | null
    uscfRating?: number | null
    ecfRating?: number | null
    rcfRating?: number | null
    cfcRating?: number | null
    dsbRating?: number | null
    socialLinks?: string | null
    ratings?: RatingUncheckedCreateNestedManyWithoutUserInput
    gamesAsBlack?: GameUncheckedCreateNestedManyWithoutBlackUserInput
  }

  export type UserCreateOrConnectWithoutGamesAsWhiteInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGamesAsWhiteInput, UserUncheckedCreateWithoutGamesAsWhiteInput>
  }

  export type UserCreateWithoutGamesAsBlackInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    username: string
    passwordHash: string
    isEmailVerified?: boolean
    refreshTokenHash?: string | null
    lastLoginAt?: Date | string | null
    biography?: string | null
    flair?: string | null
    country?: string | null
    location?: string | null
    realName?: string | null
    fideRating?: number | null
    uscfRating?: number | null
    ecfRating?: number | null
    rcfRating?: number | null
    cfcRating?: number | null
    dsbRating?: number | null
    socialLinks?: string | null
    ratings?: RatingCreateNestedManyWithoutUserInput
    gamesAsWhite?: GameCreateNestedManyWithoutWhiteUserInput
  }

  export type UserUncheckedCreateWithoutGamesAsBlackInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    username: string
    passwordHash: string
    isEmailVerified?: boolean
    refreshTokenHash?: string | null
    lastLoginAt?: Date | string | null
    biography?: string | null
    flair?: string | null
    country?: string | null
    location?: string | null
    realName?: string | null
    fideRating?: number | null
    uscfRating?: number | null
    ecfRating?: number | null
    rcfRating?: number | null
    cfcRating?: number | null
    dsbRating?: number | null
    socialLinks?: string | null
    ratings?: RatingUncheckedCreateNestedManyWithoutUserInput
    gamesAsWhite?: GameUncheckedCreateNestedManyWithoutWhiteUserInput
  }

  export type UserCreateOrConnectWithoutGamesAsBlackInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGamesAsBlackInput, UserUncheckedCreateWithoutGamesAsBlackInput>
  }

  export type UserUpsertWithoutGamesAsWhiteInput = {
    update: XOR<UserUpdateWithoutGamesAsWhiteInput, UserUncheckedUpdateWithoutGamesAsWhiteInput>
    create: XOR<UserCreateWithoutGamesAsWhiteInput, UserUncheckedCreateWithoutGamesAsWhiteInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGamesAsWhiteInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGamesAsWhiteInput, UserUncheckedUpdateWithoutGamesAsWhiteInput>
  }

  export type UserUpdateWithoutGamesAsWhiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    refreshTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    flair?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    realName?: NullableStringFieldUpdateOperationsInput | string | null
    fideRating?: NullableIntFieldUpdateOperationsInput | number | null
    uscfRating?: NullableIntFieldUpdateOperationsInput | number | null
    ecfRating?: NullableIntFieldUpdateOperationsInput | number | null
    rcfRating?: NullableIntFieldUpdateOperationsInput | number | null
    cfcRating?: NullableIntFieldUpdateOperationsInput | number | null
    dsbRating?: NullableIntFieldUpdateOperationsInput | number | null
    socialLinks?: NullableStringFieldUpdateOperationsInput | string | null
    ratings?: RatingUpdateManyWithoutUserNestedInput
    gamesAsBlack?: GameUpdateManyWithoutBlackUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGamesAsWhiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    refreshTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    flair?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    realName?: NullableStringFieldUpdateOperationsInput | string | null
    fideRating?: NullableIntFieldUpdateOperationsInput | number | null
    uscfRating?: NullableIntFieldUpdateOperationsInput | number | null
    ecfRating?: NullableIntFieldUpdateOperationsInput | number | null
    rcfRating?: NullableIntFieldUpdateOperationsInput | number | null
    cfcRating?: NullableIntFieldUpdateOperationsInput | number | null
    dsbRating?: NullableIntFieldUpdateOperationsInput | number | null
    socialLinks?: NullableStringFieldUpdateOperationsInput | string | null
    ratings?: RatingUncheckedUpdateManyWithoutUserNestedInput
    gamesAsBlack?: GameUncheckedUpdateManyWithoutBlackUserNestedInput
  }

  export type UserUpsertWithoutGamesAsBlackInput = {
    update: XOR<UserUpdateWithoutGamesAsBlackInput, UserUncheckedUpdateWithoutGamesAsBlackInput>
    create: XOR<UserCreateWithoutGamesAsBlackInput, UserUncheckedCreateWithoutGamesAsBlackInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGamesAsBlackInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGamesAsBlackInput, UserUncheckedUpdateWithoutGamesAsBlackInput>
  }

  export type UserUpdateWithoutGamesAsBlackInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    refreshTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    flair?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    realName?: NullableStringFieldUpdateOperationsInput | string | null
    fideRating?: NullableIntFieldUpdateOperationsInput | number | null
    uscfRating?: NullableIntFieldUpdateOperationsInput | number | null
    ecfRating?: NullableIntFieldUpdateOperationsInput | number | null
    rcfRating?: NullableIntFieldUpdateOperationsInput | number | null
    cfcRating?: NullableIntFieldUpdateOperationsInput | number | null
    dsbRating?: NullableIntFieldUpdateOperationsInput | number | null
    socialLinks?: NullableStringFieldUpdateOperationsInput | string | null
    ratings?: RatingUpdateManyWithoutUserNestedInput
    gamesAsWhite?: GameUpdateManyWithoutWhiteUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGamesAsBlackInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    refreshTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    biography?: NullableStringFieldUpdateOperationsInput | string | null
    flair?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    realName?: NullableStringFieldUpdateOperationsInput | string | null
    fideRating?: NullableIntFieldUpdateOperationsInput | number | null
    uscfRating?: NullableIntFieldUpdateOperationsInput | number | null
    ecfRating?: NullableIntFieldUpdateOperationsInput | number | null
    rcfRating?: NullableIntFieldUpdateOperationsInput | number | null
    cfcRating?: NullableIntFieldUpdateOperationsInput | number | null
    dsbRating?: NullableIntFieldUpdateOperationsInput | number | null
    socialLinks?: NullableStringFieldUpdateOperationsInput | string | null
    ratings?: RatingUncheckedUpdateManyWithoutUserNestedInput
    gamesAsWhite?: GameUncheckedUpdateManyWithoutWhiteUserNestedInput
  }

  export type RatingCreateManyUserInput = {
    id?: string
    timeControl: $Enums.TimeControl
    rating: number
    deviation: number
    volatility: number
    updatedAt?: Date | string
  }

  export type GameCreateManyWhiteUserInput = {
    id?: string
    createdAt?: Date | string
    timeControl: $Enums.TimeControl
    status?: $Enums.GameStatus
    blackUserId?: string | null
    whiteRating: number
    blackRating: number
    whiteDeviation: number
    blackDeviation: number
    whiteVolatility: number
    blackVolatility: number
    initialFen: string
    startedAt?: Date | string | null
    abortedAt?: Date | string | null
  }

  export type GameCreateManyBlackUserInput = {
    id?: string
    createdAt?: Date | string
    timeControl: $Enums.TimeControl
    status?: $Enums.GameStatus
    whiteUserId?: string | null
    whiteRating: number
    blackRating: number
    whiteDeviation: number
    blackDeviation: number
    whiteVolatility: number
    blackVolatility: number
    initialFen: string
    startedAt?: Date | string | null
    abortedAt?: Date | string | null
  }

  export type RatingUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    timeControl?: EnumTimeControlFieldUpdateOperationsInput | $Enums.TimeControl
    rating?: IntFieldUpdateOperationsInput | number
    deviation?: FloatFieldUpdateOperationsInput | number
    volatility?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    timeControl?: EnumTimeControlFieldUpdateOperationsInput | $Enums.TimeControl
    rating?: IntFieldUpdateOperationsInput | number
    deviation?: FloatFieldUpdateOperationsInput | number
    volatility?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    timeControl?: EnumTimeControlFieldUpdateOperationsInput | $Enums.TimeControl
    rating?: IntFieldUpdateOperationsInput | number
    deviation?: FloatFieldUpdateOperationsInput | number
    volatility?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameUpdateWithoutWhiteUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeControl?: EnumTimeControlFieldUpdateOperationsInput | $Enums.TimeControl
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    whiteRating?: IntFieldUpdateOperationsInput | number
    blackRating?: IntFieldUpdateOperationsInput | number
    whiteDeviation?: FloatFieldUpdateOperationsInput | number
    blackDeviation?: FloatFieldUpdateOperationsInput | number
    whiteVolatility?: FloatFieldUpdateOperationsInput | number
    blackVolatility?: FloatFieldUpdateOperationsInput | number
    initialFen?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    blackUser?: UserUpdateOneWithoutGamesAsBlackNestedInput
  }

  export type GameUncheckedUpdateWithoutWhiteUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeControl?: EnumTimeControlFieldUpdateOperationsInput | $Enums.TimeControl
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    blackUserId?: NullableStringFieldUpdateOperationsInput | string | null
    whiteRating?: IntFieldUpdateOperationsInput | number
    blackRating?: IntFieldUpdateOperationsInput | number
    whiteDeviation?: FloatFieldUpdateOperationsInput | number
    blackDeviation?: FloatFieldUpdateOperationsInput | number
    whiteVolatility?: FloatFieldUpdateOperationsInput | number
    blackVolatility?: FloatFieldUpdateOperationsInput | number
    initialFen?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GameUncheckedUpdateManyWithoutWhiteUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeControl?: EnumTimeControlFieldUpdateOperationsInput | $Enums.TimeControl
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    blackUserId?: NullableStringFieldUpdateOperationsInput | string | null
    whiteRating?: IntFieldUpdateOperationsInput | number
    blackRating?: IntFieldUpdateOperationsInput | number
    whiteDeviation?: FloatFieldUpdateOperationsInput | number
    blackDeviation?: FloatFieldUpdateOperationsInput | number
    whiteVolatility?: FloatFieldUpdateOperationsInput | number
    blackVolatility?: FloatFieldUpdateOperationsInput | number
    initialFen?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GameUpdateWithoutBlackUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeControl?: EnumTimeControlFieldUpdateOperationsInput | $Enums.TimeControl
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    whiteRating?: IntFieldUpdateOperationsInput | number
    blackRating?: IntFieldUpdateOperationsInput | number
    whiteDeviation?: FloatFieldUpdateOperationsInput | number
    blackDeviation?: FloatFieldUpdateOperationsInput | number
    whiteVolatility?: FloatFieldUpdateOperationsInput | number
    blackVolatility?: FloatFieldUpdateOperationsInput | number
    initialFen?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    whiteUser?: UserUpdateOneWithoutGamesAsWhiteNestedInput
  }

  export type GameUncheckedUpdateWithoutBlackUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeControl?: EnumTimeControlFieldUpdateOperationsInput | $Enums.TimeControl
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    whiteUserId?: NullableStringFieldUpdateOperationsInput | string | null
    whiteRating?: IntFieldUpdateOperationsInput | number
    blackRating?: IntFieldUpdateOperationsInput | number
    whiteDeviation?: FloatFieldUpdateOperationsInput | number
    blackDeviation?: FloatFieldUpdateOperationsInput | number
    whiteVolatility?: FloatFieldUpdateOperationsInput | number
    blackVolatility?: FloatFieldUpdateOperationsInput | number
    initialFen?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GameUncheckedUpdateManyWithoutBlackUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timeControl?: EnumTimeControlFieldUpdateOperationsInput | $Enums.TimeControl
    status?: EnumGameStatusFieldUpdateOperationsInput | $Enums.GameStatus
    whiteUserId?: NullableStringFieldUpdateOperationsInput | string | null
    whiteRating?: IntFieldUpdateOperationsInput | number
    blackRating?: IntFieldUpdateOperationsInput | number
    whiteDeviation?: FloatFieldUpdateOperationsInput | number
    blackDeviation?: FloatFieldUpdateOperationsInput | number
    whiteVolatility?: FloatFieldUpdateOperationsInput | number
    blackVolatility?: FloatFieldUpdateOperationsInput | number
    initialFen?: StringFieldUpdateOperationsInput | string
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    abortedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}