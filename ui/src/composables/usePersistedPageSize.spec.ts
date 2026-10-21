import {describe, it, expect, beforeEach, afterEach} from "vitest"

import {loadPersistedPageSize, persistPageSize} from "./usePersistedPageSize"
import {storageKeys} from "../utils/constants"

describe("usePersistedPageSize", () => {
    beforeEach(() => {
        localStorage.clear()
    })

    afterEach(() => {
        localStorage.clear()
    })

    it("returns the default when nothing was saved", () => {
        expect(loadPersistedPageSize()).toBe(25)
    })

    it("returns the custom default when nothing was saved", () => {
        expect(loadPersistedPageSize(50)).toBe(50)
    })

    it("returns the saved value after persistPageSize", () => {
        persistPageSize(100)

        expect(loadPersistedPageSize()).toBe(100)
    })

    it("falls back to the default when the saved value is not a positive number", () => {
        localStorage.setItem(storageKeys.PAGINATION_SIZE, "not-a-number")
        expect(loadPersistedPageSize()).toBe(25)

        localStorage.setItem(storageKeys.PAGINATION_SIZE, "0")
        expect(loadPersistedPageSize()).toBe(25)

        localStorage.setItem(storageKeys.PAGINATION_SIZE, "-10")
        expect(loadPersistedPageSize()).toBe(25)
    })
})
