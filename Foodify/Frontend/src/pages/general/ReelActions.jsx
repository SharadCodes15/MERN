import {
  RiBookmarkFill,
  RiBookmarkLine,
  RiChat3Line,
  RiHeart3Fill,
  RiHeart3Line,
} from "@remixicon/react";

function ActionButton({ label, count, active, onClick, children, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`${active ? "Remove" : "Add"} ${label}`}
      className={`reel-action ${active ? "reel-action--active" : ""}`}
    >
      {children}
      <span>{count}</span>
    </button>
  );
}

export default function ReelActions({ video, onLike, onSave }) {
  const likes = video.likes ?? video.likeCount ?? 0;

  return (
    <aside className="reel-actions" aria-label="Reel actions">
      <ActionButton
        label="like"
        count={likes}
        active={Boolean(video.liked)}
        onClick={onLike}
        disabled={video.likePending}
      >
        {video.liked ? <RiHeart3Fill /> : <RiHeart3Line />}
      </ActionButton>
      <ActionButton
        label="save"
        count={video.saves ?? video.saveCount ?? 0}
        active={Boolean(video.saved)}
        onClick={onSave}
        disabled={video.savePending}
      >
        {video.saved ? <RiBookmarkFill /> : <RiBookmarkLine />}
      </ActionButton>
      <div className="reel-action" aria-label={`${video.comments ?? video.commentCount ?? 0} comments`}>
        <RiChat3Line />
        <span>{video.comments ?? video.commentCount ?? 0}</span>
      </div>
    </aside>
  );
}