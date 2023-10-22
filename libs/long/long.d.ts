/**
 * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
 * See the from* functions below for more convenient ways of constructing Longs.
 * @param low The low (signed) 32 bits of the long
 * @param high The high (signed) 32 bits of the long
 * @param unsigned Whether unsigned or not, defaults to signed
 */
declare class Long {

    /**
     * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
     * See the from* functions below for more convenient ways of constructing Longs.
     * @param low The low (signed) 32 bits of the long
     * @param high The high (signed) 32 bits of the long
     * @param unsigned Whether unsigned or not, defaults to signed
     */
    constructor(low: number, high: number, unsigned?: boolean);

    /** The low 32 bits as a signed value. */
    public low: number;

    /** The high 32 bits as a signed value. */
    public high: number;

    /** Whether unsigned or not. */
    public unsigned: boolean;

    /**
     * Tests if the specified object is a Long.
     * @param obj Object
     */
    public static isLong(obj: any): boolean;

    /**
     * Returns a Long representing the given 32 bit integer value.
     * @param value The 32 bit integer in question
     * @param unsigned Whether unsigned or not, defaults to signed
     * @returns The corresponding Long value
     */
    public static fromInt(value: number, unsigned?: boolean): Long;

    /**
     * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
     * @param value The number in question
     * @param unsigned Whether unsigned or not, defaults to signed
     * @returns The corresponding Long value
     */
    public static fromNumber(value: number, unsigned?: boolean): Long;

    /**
     * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
     * assumed to use 32 bits.
     * @param lowBits The low 32 bits
     * @param highBits The high 32 bits
     * @param unsigned Whether unsigned or not, defaults to signed
     * @returns The corresponding Long value
     */
    public static fromBits(lowBits: number, highBits: number, unsigned?: boolean): Long;

    /**
     * Returns a Long representation of the given string, written using the specified radix.
     * @param str The textual representation of the Long
     * @param unsigned Whether unsigned or not, defaults to signed
     * @param radix The radix in which the text is written (2-36), defaults to 10
     * @returns The corresponding Long value
     */
    public static fromString(str: string, unsigned?: (boolean | number), radix?: number): Long;

    /**
     * Converts the specified value to a Long using the appropriate from* function for its type.
     * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
     * @param unsigned Whether unsigned or not, defaults to signed
     */
    public static fromValue(val: (Long | number | string | object), unsigned?: boolean): Long;

    /** Signed zero. */
    public static ZERO: Long;

    /** Unsigned zero. */
    public static UZERO: Long;

    /** Signed one. */
    public static ONE: Long;

    /** Unsigned one. */
    public static UONE: Long;

    /** Signed negative one. */
    public static NEG_ONE: Long;

    /** Maximum signed value. */
    public static MAX_VALUE: Long;

    /** Maximum unsigned value. */
    public static MAX_UNSIGNED_VALUE: Long;

    /** Minimum signed value. */
    public static MIN_VALUE: Long;

    /**
     * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
     */
    public toInt(): number;

    /**
     * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
     */
    public toNumber(): number;

    /**
     * Converts the Long to a string written in the specified radix.
     * @param radix Radix (2-36), defaults to 10
     * @throws {RangeError} If `radix` is out of range
     */
    public toString(radix?: number): string;

    /**
     * Gets the high 32 bits as a signed integer.
     * @returns Signed high bits
     */
    public getHighBits(): number;

    /**
     * Gets the high 32 bits as an unsigned integer.
     * @returns Unsigned high bits
     */
    public getHighBitsUnsigned(): number;

    /**
     * Gets the low 32 bits as a signed integer.
     * @returns Signed low bits
     */
    public getLowBits(): number;

    /**
     * Gets the low 32 bits as an unsigned integer.
     * @returns Unsigned low bits
     */
    public getLowBitsUnsigned(): number;

    /**
     * Gets the number of bits needed to represent the absolute value of this Long.
     */
    public getNumBitsAbs(): number;

    /**
     * Tests if this Long's value equals zero.
     */
    public isZero(): boolean;

    /**
     * Tests if this Long's value equals zero. This is an alias of {@link Long#isZero}.
     */
    public eqz: any;

    /**
     * Tests if this Long's value is negative.
     */
    public isNegative(): boolean;

    /**
     * Tests if this Long's value is positive.
     */
    public isPositive(): boolean;

    /**
     * Tests if this Long's value is odd.
     */
    public isOdd(): boolean;

    /**
     * Tests if this Long's value is even.
     */
    public isEven(): boolean;

    /**
     * Tests if this Long's value equals the specified's.
     * @param other Other value
     */
    public equals(other: (Long | number | string)): boolean;

    /**
     * Tests if this Long's value equals the specified's. This is an alias of {@link Long#equals}.
     * @param other Other value
     */
    public eq(other: (Long | number | string)): boolean;

    /**
     * Tests if this Long's value differs from the specified's.
     * @param other Other value
     */
    public notEquals(other: (Long | number | string)): boolean;

    /**
     * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
     * @param other Other value
     */
    public neq(other: (Long | number | string)): boolean;

    /**
     * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
     * @param other Other value
     */
    public ne(other: (Long | number | string)): boolean;

    /**
     * Tests if this Long's value is less than the specified's.
     * @param other Other value
     */
    public lessThan(other: (Long | number | string)): boolean;

    /**
     * Tests if this Long's value is less than the specified's. This is an alias of {@link Long#lessThan}.
     * @param other Other value
     */
    public lt(other: (Long | number | string)): boolean;

    /**
     * Tests if this Long's value is less than or equal the specified's.
     * @param other Other value
     */
    public lessThanOrEqual(other: (Long | number | string)): boolean;

    /**
     * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
     * @param other Other value
     */
    public lte(other: (Long | number | string)): boolean;

    /**
     * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
     * @param other Other value
     */
    public le(other: (Long | number | string)): boolean;

    /**
     * Tests if this Long's value is greater than the specified's.
     * @param other Other value
     */
    public greaterThan(other: (Long | number | string)): boolean;

    /**
     * Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
     * @param other Other value
     */
    public gt(other: (Long | number | string)): boolean;

    /**
     * Tests if this Long's value is greater than or equal the specified's.
     * @param other Other value
     */
    public greaterThanOrEqual(other: (Long | number | string)): boolean;

    /**
     * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
     * @param other Other value
     */
    public gte(other: (Long | number | string)): boolean;

    /**
     * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
     * @param other Other value
     */
    public ge(other: (Long | number | string)): boolean;

    /**
     * Compares this Long's value with the specified's.
     * @param other Other value
     * @returns 0 if they are the same, 1 if the this is greater and -1
     * if the given one is greater
     */
    public compare(other: (Long | number | string)): number;

    /**
     * Compares this Long's value with the specified's. This is an alias of {@link Long#compare}.
     * @param other Other value
     * @returns 0 if they are the same, 1 if the this is greater and -1
     * if the given one is greater
     */
    public comp(other: (Long | number | string)): number;

    /**
     * Negates this Long's value.
     * @returns Negated Long
     */
    public negate(): Long;

    /**
     * Negates this Long's value. This is an alias of {@link Long#negate}.
     * @returns Negated Long
     */
    public neg(): Long;

    /**
     * Returns the sum of this and the specified Long.
     * @param addend Addend
     * @returns Sum
     */
    public add(addend: (Long | number | string)): Long;

    /**
     * Returns the difference of this and the specified Long.
     * @param subtrahend Subtrahend
     * @returns Difference
     */
    public subtract(subtrahend: (Long | number | string)): Long;

    /**
     * Returns the difference of this and the specified Long. This is an alias of {@link Long#subtract}.
     * @param subtrahend Subtrahend
     * @returns Difference
     */
    public sub(subtrahend: (Long | number | string)): Long;

    /**
     * Returns the product of this and the specified Long.
     * @param multiplier Multiplier
     * @returns Product
     */
    public multiply(multiplier: (Long | number | string)): Long;

    /**
     * Returns the product of this and the specified Long. This is an alias of {@link Long#multiply}.
     * @param multiplier Multiplier
     * @returns Product
     */
    public mul(multiplier: (Long | number | string)): Long;

    /**
     * Returns this Long divided by the specified. The result is signed if this Long is signed or
     * unsigned if this Long is unsigned.
     * @param divisor Divisor
     * @returns Quotient
     */
    public divide(divisor: (Long | number | string)): Long;

    /**
     * Returns this Long divided by the specified. This is an alias of {@link Long#divide}.
     * @param divisor Divisor
     * @returns Quotient
     */
    public div(divisor: (Long | number | string)): Long;

    /**
     * Returns this Long modulo the specified.
     * @param divisor Divisor
     * @returns Remainder
     */
    public modulo(divisor: (Long | number | string)): Long;

    /**
     * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
     * @param divisor Divisor
     * @returns Remainder
     */
    public mod(divisor: (Long | number | string)): Long;

    /**
     * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
     * @param divisor Divisor
     * @returns Remainder
     */
    public rem(divisor: (Long | number | string)): Long;

    /**
     * Returns the bitwise NOT of this Long.
     */
    public not(): Long;

    /**
     * Returns the bitwise AND of this Long and the specified.
     * @param other Other Long
     */
    public and(other: (Long | number | string)): Long;

    /**
     * Returns the bitwise OR of this Long and the specified.
     * @param other Other Long
     */
    public or(other: (Long | number | string)): Long;

    /**
     * Returns the bitwise XOR of this Long and the given one.
     * @param other Other Long
     */
    public xor(other: (Long | number | string)): Long;

    /**
     * Returns this Long with bits shifted to the left by the given amount.
     * @param numBits Number of bits
     * @returns Shifted Long
     */
    public shiftLeft(numBits: (number | Long)): Long;

    /**
     * Returns this Long with bits shifted to the left by the given amount. This is an alias of {@link Long#shiftLeft}.
     * @param numBits Number of bits
     * @returns Shifted Long
     */
    public shl(numBits: (number | Long)): Long;

    /**
     * Returns this Long with bits arithmetically shifted to the right by the given amount.
     * @param numBits Number of bits
     * @returns Shifted Long
     */
    public shiftRight(numBits: (number | Long)): Long;

    /**
     * Returns this Long with bits arithmetically shifted to the right by the given amount. This is an alias of {@link Long#shiftRight}.
     * @param numBits Number of bits
     * @returns Shifted Long
     */
    public shr(numBits: (number | Long)): Long;

    /**
     * Returns this Long with bits logically shifted to the right by the given amount.
     * @param numBits Number of bits
     * @returns Shifted Long
     */
    public shiftRightUnsigned(numBits: (number | Long)): Long;

    /**
     * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
     * @param numBits Number of bits
     * @returns Shifted Long
     */
    public shru(numBits: (number | Long)): Long;

    /**
     * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
     * @param numBits Number of bits
     * @returns Shifted Long
     */
    public shr_u(numBits: (number | Long)): Long;

    /**
     * Converts this Long to signed.
     * @returns Signed long
     */
    public toSigned(): Long;

    /**
     * Converts this Long to unsigned.
     * @returns Unsigned long
     */
    public toUnsigned(): Long;

    /**
     * Converts this Long to its byte representation.
     * @param le Whether little or big endian, defaults to big endian
     * @returns Byte representation
     */
    public toBytes(le?: boolean): number[];

    /**
     * Converts this Long to its little endian byte representation.
     * @returns Little endian byte representation
     */
    public toBytesLE(): number[];

    /**
     * Converts this Long to its big endian byte representation.
     * @returns Big endian byte representation
     */
    public toBytesBE(): number[];

    /**
     * Creates a Long from its byte representation.
     * @param bytes Byte representation
     * @param unsigned Whether unsigned or not, defaults to signed
     * @param le Whether little or big endian, defaults to big endian
     * @returns The corresponding Long value
     */
    public static fromBytes(bytes: number[], unsigned?: boolean, le?: boolean): Long;

    /**
     * Creates a Long from its little endian byte representation.
     * @param bytes Little endian byte representation
     * @param unsigned Whether unsigned or not, defaults to signed
     * @returns The corresponding Long value
     */
    public static fromBytesLE(bytes: number[], unsigned?: boolean): Long;

    /**
     * Creates a Long from its big endian byte representation.
     * @param bytes Big endian byte representation
     * @param unsigned Whether unsigned or not, defaults to signed
     * @returns The corresponding Long value
     */
    public static fromBytesBE(bytes: number[], unsigned?: boolean): Long;
}