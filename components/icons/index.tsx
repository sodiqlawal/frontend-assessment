import { Colors } from '@/constants/color';

type IconProps = React.HTMLAttributes<SVGElement> & {
  width?: string;
  height?: string;
};

export const Icons = {
  addCircle: ({ className, ...props }: IconProps) => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4v4zm1 5a9.873 9.873 0 0 1-3.9-.775 10.274 10.274 0 0 1-3.175-2.15c-.9-.9-1.617-1.958-2.15-3.175A9.873 9.873 0 0 1 2 12c0-1.383.258-2.683.775-3.9a10.275 10.275 0 0 1 2.15-3.175c.9-.9 1.958-1.608 3.175-2.125A9.607 9.607 0 0 1 12 2c1.383 0 2.683.267 3.9.8a9.927 9.927 0 0 1 3.175 2.125c.9.9 1.608 1.958 2.125 3.175.533 1.217.8 2.517.8 3.9a9.607 9.607 0 0 1-.8 3.9 9.927 9.927 0 0 1-2.125 3.175c-.9.9-1.958 1.617-3.175 2.15A9.873 9.873 0 0 1 12 22zm0-2c2.233 0 4.125-.775 5.675-2.325C19.225 16.125 20 14.233 20 12c0-2.233-.775-4.125-2.325-5.675C16.125 4.775 14.233 4 12 4c-2.233 0-4.125.775-5.675 2.325C4.775 7.875 4 9.767 4 12c0 2.233.775 4.125 2.325 5.675C7.875 19.225 9.767 20 12 20z'
        fill={Colors.dark[600]}
      />
    </svg>
  ),
  delete: ({ className, ...props }: IconProps) => (
    <svg
      width='12'
      height='12'
      viewBox='0 0 12 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M1.5 3h9M9.5 3v7c0 .5-.5 1-1 1h-5c-.5 0-1-.5-1-1V3M4 3V2c0-.5.5-1 1-1h2c.5 0 1 .5 1 1v1M5 5.5v3M7 5.5v3'
        stroke={Colors.danger[500]}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ),
  crumbSeperator: ({ className, ...props }: IconProps) => (
    <svg
      width='14'
      height='14'
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M5.25 10.5 8.75 7l-3.5-3.5'
        stroke={Colors.gray[600]}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ),
  chevronRight: ({ className, color, ...props }: IconProps) => (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='m6 12 4-4-4-4'
        stroke={color || Colors.dark[500]}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ),
  chevronLeft: ({ className, color, ...props }: IconProps) => (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M10 4 6 8l4 4'
        stroke={color || Colors.dark[500]}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ),
};
