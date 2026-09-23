import {
  RiBookmarkFill,
  RiBookmarkLine,
  RiChat3Line,
  RiHeart3Fill,
  RiHeart3Line,
  RiMoreLine,
  RiShareForwardLine,
} from "@remixicon/react";

function ActionButton({ label, count, active, onClick, children, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`${active ? "Remove from" : "Add to"} ${label}`}
      className={`reel-action ${active ? "reel-action--active" : ""}`}
    >
      <span className="reel-action__icon">{children}</span>
      <span className="reel-action__count">{count}</span>
      <span className="reel-action__label">{label}</span>
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
        <span className="reel-action__icon"><RiChat3Line /></span>
        <span className="reel-action__count">{video.comments ?? video.commentCount ?? 0}</span>
        <span className="reel-action__label">comments</span>
      </div>
      <button type="button" className="reel-action reel-action--utility" aria-label="Share reel">
        <span className="reel-action__icon"><RiShareForwardLine /></span>
        <span className="reel-action__label">share</span>
      </button>
      <button type="button" className="reel-action reel-action--utility" aria-label="More reel options">
        <span className="reel-action__icon"><RiMoreLine /></span>
      </button>
    </aside>
  );
}