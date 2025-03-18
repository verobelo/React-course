import "./App.css";

import { TwitterFollowCard } from "./TwitterFollowCard.jsx";

const users = [
  { name: "Auronplay", userName: "auronplay", isFollowing: false },
  { name: "Perxitaa", userName: "perxitaa", isFollowing: true },
  { name: "Ibai", userName: "ibai", isFollowing: false },
  { name: "Gemita", userName: "gemita", isFollowing: true },
];

export function App() {
  return (
    <section className="App">
      {users.map(({ name, userName, isFollowing }) => (
        <TwitterFollowCard
          key={userName}
          userName={userName}
          initialIsFollowing={isFollowing}>
          {name}
        </TwitterFollowCard>
      ))}
    </section>
  );
}
