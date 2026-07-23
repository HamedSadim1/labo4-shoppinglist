import type { ReactNode, SVGProps } from 'react';

/**
 * Centralised icon module.
 *
 * The wrapper absorbs the repeated `viewBox`/`fill`/`stroke`/`strokeWidth`/
 * `aria-hidden` boilerplate that used to live in five components. Authors
 * pass standard SVG props (className for sizing + colour via `text-*`,
 * strokeWidth for fat variants) and the icon renders correctly.
 */

type StrokeIconProps = SVGProps<SVGSVGElement> & { children: ReactNode };

function StrokeIcon({ children, ...props }: StrokeIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

type IconProps = SVGProps<SVGSVGElement>;

// --- Check --------------------------------------------------------------

/**
 * The checkmark — used in:
 *   - <Item /> (animated draw; pass `pathLength` + `pathClassName`)
 *   - <Toast /> success badge
 *   - <EditItem /> Save button
 *
 * Composes with StrokeIcon to inherit the package's standard defaults.
 * `pathLength` and `pathClassName` are forwarded to the inner <path>
 * (NOT the wrapping <svg>) because the checkmark-draw animation needs
 * `stroke-dasharray` + `dashoffset` on the path itself.
 */
export function CheckIcon({
  pathLength,
  pathClassName,
  children,
  ...svgProps
}: IconProps & {
  pathLength?: number;
  pathClassName?: string;
  children?: ReactNode;
}) {
  return (
    <StrokeIcon {...svgProps}>
      {children ?? (
        <path
          d="M5 13l4 4L19 7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={pathClassName}
          {...(pathLength !== undefined ? { pathLength } : {})}
        />
      )}
    </StrokeIcon>
  );
}

// --- X / Close ----------------------------------------------------------

export function XIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </StrokeIcon>
  );
}

// --- Trash --------------------------------------------------------------

export function TrashIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </StrokeIcon>
  );
}

// --- Edit pencil --------------------------------------------------------

export function EditIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </StrokeIcon>
  );
}

// --- Search -------------------------------------------------------------

export function SearchIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </StrokeIcon>
  );
}

// --- Alert triangle -----------------------------------------------------

export function AlertTriangleIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
      />
    </StrokeIcon>
  );
}

/**
 * Mini alert triangle for small badge contexts (e.g. toast error icon).
 * Slightly different proportions from `AlertTriangleIcon` so the inner
 * exclamation line reads correctly at w-3.5/h-3.5 sizes.
 */
export function AlertTriangleMiniIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v4m0 4h.01M5 19h14a2 2 0 001.84-2.75L13.74 4a2 2 0 00-3.48 0L3.16 16.25A2 2 0 005 19z"
      />
    </StrokeIcon>
  );
}

// --- Info circle --------------------------------------------------------

export function InfoIcon(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </StrokeIcon>
  );
}
