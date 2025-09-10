
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';


const components = {
  Image,
  a: (props: any) => <Link {...props} />,
  // Add other custom components here
};

export function MDXComponents({ code }: { code: any }) {
  // The type for `components` is intentionally broad to allow for flexibility.
  // You can tighten this if you have a specific set of components.
  return <MDXRemote source={code} components={components as any} />;
}
