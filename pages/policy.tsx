import type { NextPage } from 'next';

export const PolicyPage: NextPage = () => {
  return (
    <div>
      <h1 data-title>Privacy Policy</h1>
      <p>
        私は、プライバシー保護を重要だと考えています。ので、セキュリティ意識は強く持っています。
      </p>
      <h2>個人情報に関して</h2>
      <ul>
        <li>個人情報は、適法かつ適正な方法で取得する</li>
        <li>個人情報は、本人の同意なく第三者に提供しない</li>
        <li>個人情報は、漏洩の無いよう安全に管理する</li>
        <li>個人的な理由で、個人情報へのアクセスはしない</li>
        <li>万が一、個人情報が漏洩した場合も考慮したシステム設計をする</li>
        <li>個人情報保護に関する相談はツイッターで対応する</li>
      </ul>
      <h2>TwitterMDに関して</h2>
      <ul>
        <li>個人情報は永続保存しない</li>
        <li>個人情報はsessionに一時的に保存する</li>
        <li>通信にはhttpsを用いる</li>
      </ul>
    </div>
  );
};

export default PolicyPage;
