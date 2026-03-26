# Client Location and Address Flow Architecture

## Summary

This document describes the frontend architecture introduced for the client onboarding location flow in `pagoclaro-app`.

The implementation now allows the user to:

- select a point on an interactive map
- obtain a readable address automatically from backend reverse geocoding
- keep editing the address manually at all times
- submit coordinates and final address together in the client creation flow

## Architectural Changes

### 1. Address ownership moved to step 3

The wizard no longer asks for `address` in the basic info step.

Address is now owned by the geolocation step because:

- coordinates are selected there
- reverse geocoding happens there
- the final editable address must stay close to the map interaction

This reduces duplicated state and removes the previous mismatch where the user typed an address before selecting the final point.

### 2. Client-only map component

A dedicated client-side map component was added:

- `src/components/clients/wizard/ClientLocationMapPicker.tsx`

Responsibilities:

- initialize Leaflet only on the client
- render OpenStreetMap tiles
- let the user place a marker by clicking
- let the user fine tune the position by dragging the marker
- emit normalized `{ latitude, longitude }` updates to the parent form

The map integration is imperative on purpose to avoid SSR and wrapper-specific complexity.

### 3. Reverse geocoding orchestration extracted to a hook

A dedicated hook was added:

- `src/hooks/use-reverse-geocode-address.ts`

Responsibilities:

- store the currently selected coordinates
- debounce reverse geocoding requests
- call the backend geocoding endpoint through a small API helper
- protect the UI from stale responses
- avoid overwriting a manual address edit performed after a lookup started
- expose loading, success and error states to the form

This keeps networking and request-state rules out of the map and input components.

### 4. API access isolated behind a helper

A thin client helper was added:

- `src/lib/clients/reverse-geocode.ts`

Responsibilities:

- call `/clients/reverse-geocode`
- reuse the shared `src/lib/api.ts` wrapper
- keep HTTP details out of UI components

This preserves the app rule that backend communication should pass through the API layer.

### 5. Form schema and wizard contract were aligned

The shared wizard schema was updated in:

- `src/lib/schemas/client-wizard.ts`

Key changes:

- `ClientBasicInfo` no longer contains `address`
- `ClientGeolocation` now requires `address`
- `latitude` and `longitude` must be selected before submit

This aligns frontend validation with the backend client creation contract.

### 6. Submission path remains unchanged at the transport boundary

`CreateClientWizard` still builds the final `FormData` and sends:

- `name`
- `cedula`
- `phone`
- `address`
- `latitude`
- `longitude`
- `status`
- merged `photo`

The only functional change is that `address` now always comes from the final geolocation step and coordinates are appended using nullish checks instead of truthy checks.

### 7. UI state model

The geolocation step now has three parallel but decoupled concerns:

- map selection state
- reverse geocoding state
- editable form state

The user experience is intentionally non-blocking:

- the map can change while lookups run
- the address can always be edited
- reverse geocoding errors never lock the form

## Styling and runtime support

The app layout imports Leaflet CSS globally and `globals.css` adds:

- map container styling
- zoom control visual alignment
- a custom marker based on `divIcon`

This avoids Leaflet default image asset issues and keeps the map visually aligned with the app theme.

## Testing Architecture

Frontend unit test support was added with:

- `vitest.config.ts`
- `src/test/setup.ts`

Current automated coverage focuses on the hook because that is where the critical coordination logic lives:

- debounce behavior
- loading to success transitions
- stale response protection
- manual edit protection

This gives high confidence in the business behavior without requiring DOM-heavy map tests for every scenario.
