# Client Location and Address Flow Decisions

## Scope decisions

### Decision: move address capture to step 3

We removed `address` from the basic info step and made the geolocation step the single source of truth.

Reason:

- the final address depends on the selected map point
- keeping address in two steps creates duplication and user friction
- the requested feature is specifically about auto-filling after map selection

### Decision: keep manual editing always enabled

Reverse geocoding never locks the address input.

Reason:

- upstream geocoding may fail or return an imperfect label
- the user needs a guaranteed manual fallback
- this was a stated acceptance criterion

## Technical decisions

### Decision: use Leaflet with imperative client-only setup

We implemented the map with Leaflet directly instead of adding a React wrapper.

Reason:

- lower SSR risk in Next App Router
- easier control over initialization and cleanup
- avoids wrapper compatibility questions
- matches the requested "client-only" assumption

### Decision: use OpenStreetMap tiles in the picker

The map displays OSM tiles.

Reason:

- no extra frontend secret or token is required
- it matches the chosen no-billing provider direction
- it keeps the map usable without introducing another paid service

### Decision: route reverse geocoding through backend

The frontend does not call the geocoding provider directly.

Reason:

- keeps provider details out of UI components
- follows the project API-first rule
- centralizes error handling and future provider swaps

### Decision: add a dedicated hook for lookup orchestration

We created `use-reverse-geocode-address.ts`.

Reason:

- debounce and stale-response protection are behavioral rules, not presentational concerns
- the logic needs isolated unit tests
- the map component should remain focused on coordinate selection only

### Decision: use nullish checks for coordinates on submit

The final submit flow now checks `latitude !== null` and `longitude !== null`.

Reason:

- numeric coordinates should not depend on truthiness
- this avoids silent bugs for valid zero-like values

## Testing decisions

### Decision: add Vitest to the app

Vitest was introduced as minimal frontend unit test tooling.

Reason:

- there was no existing app-side unit test runner
- the hook behavior is important enough to deserve automated coverage
- Vitest gives fast jsdom-based tests with low setup overhead

### Decision: test the hook instead of the full map UI

Automated tests focus on the reverse geocode hook.

Reason:

- the critical rules live in request coordination, not in Leaflet rendering
- this keeps tests stable and high-signal
- map UI behavior is still covered indirectly through the component contract
