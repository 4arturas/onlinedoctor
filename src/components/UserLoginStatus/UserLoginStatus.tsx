'use client'
import {useTranslations} from "next-intl";
import {Tooltip} from "antd";
import {getServerSession} from "next-auth";
import auth from "@/auth";
import {useEffect} from "react";
import {session} from "next-auth/core/routes";

import { counterAtom } from "@/atoms/atom";
import {useAtom, useAtomValue, useSetAtom} from "jotai";
import { useSession } from "next-auth/react";

export default function UserLoginStatus() {

  // const t = useTranslations('Header.UserLoginStatus');

  const [count, setCount] = useAtom(counterAtom);
  const { data: session } = useSession();

  return (
    <div>
      Login {count} {JSON.stringify(session)}
      <button
        onClick={() => setCount((c) => c + 1)}
      >
        Increment
      </button>
    </div>
    /*<Tooltip title={session ? t('loggedIn', { username: session.user?.name }) : t('loggedOut')}>
      <span>
        {session ? t('loggedIn', { username: session.user?.name }) : t('loggedOut')}
      </span>
    </Tooltip>*/
  );
}