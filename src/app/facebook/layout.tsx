// app/facebook/layout.tsx
export const metadata = {
  title: 'Facebook – log in or sign up',
  icons: {
    icon: 'https://www.facebook.com/images/fb_icon_325x325.png', // Place in public/ directory
  },
};

export default function FacebookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
