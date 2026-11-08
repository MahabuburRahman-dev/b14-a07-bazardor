import { auth } from "@/lib/auth";
import { ArrowRight, Mail, UserRound } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?callbackURL=/profile&reason=auth-required");
  return (
    <div className="container page-shell profile-page">
      <span className="eyebrow">YOUR ACCOUNT</span>
      <h1>আমার প্রোফাইল</h1>
      <p className="section-sub">
        আপনার অ্যাকাউন্ট এর তথ্য দেখুন ও আপডেট করুন।
      </p>
      <div className="profile-card">
        <div className="profile-user">
          <div className="profile-avatar">
            {session.user.name?.[0] || <UserRound />}
          </div>
          <div>
            <h2>{session.user.name}</h2>
            <p>
              <Mail size={15} />
              {session.user.email}
            </p>
          </div>
        </div>
        <div className="profile-info">
          <span>নাম</span>
          <b>{session.user.name}</b>
          <span>ইমেইল</span>
          <b>{session.user.email}</b>
        </div>
        <Link className="btn btn-primary" href="/profile/update">
          তথ্য আপডেট করুন <ArrowRight size={17} />
        </Link>
      </div>
    </div>
  );
}
