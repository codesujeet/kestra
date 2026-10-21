import {storageKeys} from "../utils/constants"

const DEFAULT_PAGE_SIZE = 25

/**
 * Resolves the page size to use when a list page's own URL query param is absent:
 * the last value the user picked, falling back to {@link DEFAULT_PAGE_SIZE}.
 */
export function loadPersistedPageSize(defaultSize: number = DEFAULT_PAGE_SIZE): number {
    try {
        const stored = Number(localStorage.getItem(storageKeys.PAGINATION_SIZE))
        return Number.isFinite(stored) && stored > 0 ? stored : defaultSize
    } catch {
        return defaultSize
    }
}

export function persistPageSize(size: number): void {
    try {
        localStorage.setItem(storageKeys.PAGINATION_SIZE, String(size))
    } catch {
        // localStorage may be unavailable (private mode, blocked storage); persistence is best-effort
    }
}
