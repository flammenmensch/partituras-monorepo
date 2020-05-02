import React from 'react';

interface Props {
  id: string;
  onComplete?: () => void;
}

const DownloadButton: React.FC<Props> = (props) => {
  const [loading, setLoading] = React.useState(false);

  const handleDownload = React.useCallback(async () => {
    setLoading(true);

    const response = await fetch('/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: props.id})
    });

    const blob = await response.blob();

    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${props.id}.pdf`);

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    setLoading(false);
  }, [props.id]);

  return (
    <button
      disabled={loading}
      onClick={handleDownload}
      className="button is-primary"
    >
      {loading ? 'Downloading...' : 'Download .pdf'}
    </button>
  );
};

export default DownloadButton;
