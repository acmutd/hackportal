import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RequestHelper } from '../../lib/request-helper';
import Image from 'next/image';

type CreateGooglePass = { gPayUrl: string };

interface GoogleWalletButtonProps {
  user: User;
  profile: Registration;
}

export default function GoogleWalletButton({ user, profile }: GoogleWalletButtonProps) {
  const [fetchingGPass, setFetchingGPass] = useState<boolean>(false);
  const [gPayURL, setGPaySaveURL] = useState<string>('');

  const fetchGoogleWalletPass = async (user, profile) => {
    const { data } = await RequestHelper.post<any, CreateGooglePass>(
      '/api/passbook/google',
      {
        headers: {
          Authorization: user.token,
        },
      },
      {
        uid: user.id,
        name: `${profile.user.firstName} ${profile.user.lastName}`,
        studyLevel: profile.studyLevel,
        color: profile.color,
      },
    );

    return data.gPayUrl;
  };

  useEffect(() => {
    const setPassURL = async () => {
      const gPayUrl = await fetchGoogleWalletPass(user, profile);
      setGPaySaveURL(gPayUrl);
    };

    setFetchingGPass(true);
    setPassURL();
    setFetchingGPass(false);

    return () => {
      // cleanup unmount
    };
  }, []);

  return (
    !fetchingGPass && (
      <Link href={gPayURL}>
        <Image
          src={'/assets/gwallet-button.png'}
          width="249px" //TODO adjust width and height
          height="45px"
          alt="Add to Google Wallet"
        />
      </Link>
    )
  );
}
