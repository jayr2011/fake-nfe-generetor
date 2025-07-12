interface EmailLinkProps {
    emailAddress: string;
    subject: string;
    body: string;
}

function EmailLink({ emailAddress, subject, body }: EmailLinkProps) {
  const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <a href={mailtoLink}>
      {emailAddress}
    </a>
  );
}

export default EmailLink;