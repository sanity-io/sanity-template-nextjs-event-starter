import { GetStaticProps, GetStaticPaths } from 'next';
import TicketImage from '@components/ticket-image';

export default function TicketOnlyPage() {
  return <TicketImage />;
}

export const getStaticProps: GetStaticProps<{}> = async () => {
  return Promise.resolve({
    props: {}
  });
};

export const getStaticPaths: GetStaticPaths = async () => {
  return Promise.resolve({
    // This page is only meant to be accessed from our API to generate the image,
    // so protect the page path on production using the secret
    paths: [`/ticket-image/${process.env.TICKET_IMAGE_SECRET || 'preview'}`],
    fallback: false
  });
};
