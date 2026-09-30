import "@/styles/Frame2579.css";
import type { Ref } from "react";
import { useNavigate } from "react-router-dom";

/** 列表标题用纯文本：剥掉 **加粗**、`代码`、#、> 等 Markdown 记号（一行标题不需要 md 排版）。 */
function plainStem(md: string): string {
    return md
        .replace(/```[\s\S]*?```/g, " ")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/[*_~#>]+/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

/** 一行放不下就截断成省略号。 */
function shortTitle(md: string): string {
    const s = plainStem(md);
    return s.length > 30 ? `${s.slice(0, 30)}…` : s;
}

/** 今天 / 昨天 / N 天前 / M月D日（模板时间位）。 */
function dayLabel(iso: string): string {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    const now = new Date();
    const day = 86400000;
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const that = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const hm = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
    if (that === today) return `今天 ${hm}`;
    if (today - that === day) return `昨天 ${hm}`;
    const diff = Math.round((today - that) / day);
    if (diff < 7) return `${diff} 天前`;
    return `${d.getMonth() + 1}月${d.getDate()}日`;
}

/** 判分徽标配色：GOOD/EASY 用模板绿款，其余（HARD/MISSING/AGAIN）用模板红款。 */
const isCoral = (grade: string) => grade !== "GOOD" && grade !== "EASY";

export interface PracticeHistoryItem {
    runId: number;
    stem: string;
    answeredAt: string;
    grade: string;
}

/** 未完成条目：进行中对话 + 待闭环作答（答错且未写内化笔记）合并列表。 */
export interface PracticeUndoneItem {
    runId: number;
    title: string;
    /** ongoing=进行中对话（点击回对话继续）；debt=已判分待闭环（点击进复盘写内化笔记） */
    kind: "ongoing" | "debt";
    badge: string;
    time: string;
    weak: string[];
}

export type PracticeTab = "undone" | "history";

export interface Frame2579Props {
    weekCount: number;
    total: number;
    tab: PracticeTab;
    onTabChange: (t: PracticeTab) => void;
    /** 未完成合并列表（进行中对话 + 待闭环作答），按时间倒序 */
    undone: PracticeUndoneItem[];
    /** 点击：进行中回对话继续；待闭环进复盘写内化笔记 */
    onUndoneClick?: (runId: number) => void;
    history: PracticeHistoryItem[];
    /** 历史模糊搜索：受控关键词（容器已过滤好 history 传入） */
    searchText: string;
    onSearchText: (v: string) => void;
    onHistoryClick?: (runId: number) => void;
    sentinelRef: Ref<HTMLDivElement>;
}

const Frame2579 = ({
    weekCount,
    total,
    tab,
    onTabChange,
    undone,
    history,
    searchText,
    onSearchText,
    onUndoneClick,
    onHistoryClick,
    sentinelRef,
}: Frame2579Props) => {
    const navigate = useNavigate();
    return (
        <div className="scroll-container">
            <div
                id="2_579"
                className="Pixso-frame-2_579 pixso-relative-no-shrink pixso-flex"
            >
                <div
                    id="2_580"
                    className="Pixso-frame-2_580 pixso-relative-no-shrink pixso-flex"
                >
                    <div className="frame-content-2_580 pixso-relative-flex">
                        <p
                            id="2_581"
                            className="Pixso-paragraph-2_581 pixso-relative-auto-size pixso-flex-shrink-0"
                        >
                            {"9:41"}
                        </p>
                        <div
                            id="2_582"
                            className="Pixso-frame-2_582 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                        >
                            <div
                                id="2_583"
                                className="Pixso-vector-2_583 pixso-relative-no-shrink"
                            ></div>
                            <div
                                id="2_589"
                                className="Pixso-vector-2_589 pixso-relative-no-shrink"
                            ></div>
                            <div
                                id="2_594"
                                className="Pixso-frame-2_594 pixso-relative-no-shrink"
                            >
                                <div
                                    id="2_595"
                                    className="Pixso-vector-2_595"
                                ></div>
                                <div
                                    id="2_596"
                                    className="Pixso-vector-2_596"
                                ></div>
                                <div
                                    id="2_597"
                                    className="Pixso-vector-2_597"
                                ></div>
                                <div
                                    id="2_598"
                                    className="Pixso-vector-2_598"
                                ></div>
                                <div
                                    id="2_599"
                                    className="stroke-wrapper-2_599"
                                >
                                    <div className="Pixso-rectangle-2_599 pixso-position-relative"></div>
                                    <div className="stroke-2_599"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    id="2_600"
                    className="Pixso-frame-2_600 pixso-relative-no-shrink pixso-flex-auto-height"
                    style={{ overflowY: "auto" }}
                >
                    <div className="frame-content-2_600 pixso-relative-flex" style={{ gap: 8 }}>
                        <div
                            id="2_601"
                            className="Pixso-frame-2_601 pixso-relative-no-shrink pixso-flex-auto-height"
                        >
                            <div className="frame-content-2_601 pixso-relative-flex">
                                <p
                                    id="2_602"
                                    className="Pixso-paragraph-2_602 pixso-relative-auto-size pixso-flex-shrink-0"
                                >
                                    {"练习"}
                                </p>
                                <p
                                    id="2_603"
                                    className="Pixso-paragraph-2_603 pixso-relative-auto-size pixso-flex-shrink-0"
                                >
                                    {`本周 ${weekCount} 题 · 目标 15 题`}
                                </p>
                            </div>
                        </div>
                        <div
                            id="2_604"
                            className="Pixso-frame-2_604 pixso-relative-no-shrink pixso-flex-auto-height"
                        >
                            <div className="frame-content-2_604 pixso-relative-flex">
                                <div
                                    id="2_605"
                                    className="Pixso-frame-2_605 pixso-relative-no-shrink pixso-flex"
                                >
                                    <div className="frame-content-2_605 pixso-relative-flex">
                                        <div
                                            id="2_606"
                                            className="Pixso-vector-2_606 pixso-relative-no-shrink"
                                        ></div>
                                    </div>
                                </div>
                                <div
                                    id="2_611"
                                    className="Pixso-frame-2_611 pixso-relative-flex pixso-h-auto"
                                >
                                    <div className="frame-content-2_611 pixso-relative-flex">
                                        <p
                                            id="2_612"
                                            className="Pixso-paragraph-2_612 pixso-relative-no-shrink pixso-h-auto"
                                        >
                                            {"AI 导师只提问引导，不直接给答案"}
                                        </p>
                                        <p
                                            id="2_613"
                                            className="Pixso-paragraph-2_613 pixso-relative-no-shrink pixso-h-auto"
                                        >
                                            {
                                                "先想通，才是真的会——把答案说出口前，先自己想一遍。"
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 页签：未完成对话 / 未闭环作答 / 历史练习 */}
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                gap: 8,
                                padding: "2px 0 12px",
                            }}
                        >
                            {(
                                [
                                    ["undone", "未完成"],
                                    ["history", "历史练习"],
                                ] as const
                            ).map(([key, label]) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => onTabChange(key)}
                                    style={{
                                        border: "none",
                                        cursor: "pointer",
                                        padding: "6px 14px",
                                        borderRadius: 999,
                                        fontSize: 13,
                                        fontFamily:
                                            tab === key ? '"Noto Sans SC-Bold"' : '"Noto Sans SC-Regular"',
                                        color: tab === key ? "#fff" : "var(--color-text-secondary)",
                                        background:
                                            tab === key
                                                ? "var(--color-brand-purple)"
                                                : "var(--color-bg-input)",
                                    }}
                                >
                                    {label}
                                </button>
                            ))}
                            <p
                                id="2_630"
                                className="Pixso-paragraph-2_630 pixso-relative-auto-size pixso-flex-shrink-0"
                                style={{ marginLeft: "auto", fontSize: 13, color: "var(--color-text-secondary)" }}
                            >
                                {tab === "history"
                                    ? searchText.trim()
                                        ? `匹配 ${total} 条`
                                        : `全部 ${total} 次`
                                    : `${undone.length} 个未完成`}
                            </p>
                        </div>
                        {tab === "undone" &&
                        (undone.length === 0 ? (
                            <p
                                style={{
                                    width: "100%",
                                    textAlign: "center",
                                    fontSize: 13,
                                    color: "var(--color-text-secondary)",
                                    padding: "10px 0",
                                }}
                            >
                                {"没有未完成的题目，去开一道新题吧"}
                            </p>
                        ) : (
                            undone.map((it) => (
                                <div
                                    key={`${it.kind}-${it.runId}`}
                                    onClick={() => onUndoneClick?.(it.runId)}
                                    style={{ cursor: "pointer" }}
                                    className="Pixso-frame-2_631 effect-effectcardshadow-2_19 pixso-relative-no-shrink pixso-flex-auto-height"
                                >
                                    <div className="frame-content-2_631 pixso-relative-flex">
                                        <div
                                            className="Pixso-frame-2_632 pixso-relative-flex pixso-h-auto"
                                            style={{ width: "100%" }}
                                        >
                                            <p
                                                className="Pixso-paragraph-2_633 pixso-relative-no-shrink pixso-h-auto"
                                                style={{ fontSize: 14 }}
                                            >
                                                {shortTitle(it.title)}
                                            </p>
                                            <p
                                                className="Pixso-paragraph-2_635 pixso-relative-auto-size pixso-flex-shrink-0"
                                                style={{ fontSize: 12, color: "var(--color-text-secondary)" }}
                                            >
                                                {dayLabel(it.time)}
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                width: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 8,
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize: 12,
                                                    padding: "3px 10px",
                                                    borderRadius: 999,
                                                    background:
                                                        it.kind === "ongoing"
                                                            ? "var(--color-brand-purplesoft)"
                                                            : "var(--color-brand-coralsoft)",
                                                    color:
                                                        it.kind === "ongoing"
                                                            ? "var(--color-brand-purple)"
                                                            : "var(--color-brand-coral)",
                                                }}
                                            >
                                                {it.badge}
                                            </span>
                                            {it.weak.length > 0 && (
                                                <span
                                                    style={{
                                                        fontSize: 12,
                                                        color: "var(--color-brand-coral)",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    {`薄弱点：${it.weak.slice(0, 2).join(" · ")}`}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ))}
                        {tab === "history" && (<>
                        <div
                            style={{
                                width: "100%",
                                boxSizing: "border-box",
                                background: "var(--color-bg-input)",
                                borderRadius: 14,
                                padding: "9px 14px",
                            }}
                        >
                            <input
                                value={searchText}
                                onChange={(e) => onSearchText(e.target.value)}
                                placeholder="搜索历史练习（按题干模糊匹配）"
                                style={{
                                    width: "100%",
                                    border: "none",
                                    outline: "none",
                                    background: "transparent",
                                    fontSize: 14,
                                    color: "var(--color-text-primary)",
                                }}
                            />
                        </div>
                        {history.length === 0 && searchText.trim() && (
                            <p
                                style={{
                                    width: "100%",
                                    textAlign: "center",
                                    fontSize: 13,
                                    color: "var(--color-text-secondary)",
                                    padding: "10px 0",
                                }}
                            >
                                没有匹配的历史练习
                            </p>
                        )}
                        {history.map((h) => (
                        <div
                            key={h.runId}
                            onClick={() => onHistoryClick?.(h.runId)}
                            id="2_631"
                            className="Pixso-frame-2_631 effect-effectcardshadow-2_19 pixso-relative-no-shrink pixso-flex-auto-height"
                        >
                            <div className="frame-content-2_631 pixso-relative-flex">
                                <div
                                    id="2_632"
                                    className="Pixso-frame-2_632 pixso-relative-flex pixso-h-auto"
                                >
                                    <div className="frame-content-2_632 pixso-relative-flex">
                                        <p
                                            id="2_633"
                                            className="Pixso-paragraph-2_633 pixso-relative-no-shrink pixso-h-auto"
                                        >
                                            {shortTitle(h.stem)}
                                        </p>
                                        <div
                                            id="2_634"
                                            className="Pixso-frame-2_634 pixso-relative-no-shrink pixso-flex-auto-height"
                                        >
                                            <div className="frame-content-2_634 pixso-relative-flex">
                                                <p
                                                    id="2_635"
                                                    className="Pixso-paragraph-2_635 pixso-relative-auto-size pixso-flex-shrink-0"
                                                >
                                                    {dayLabel(h.answeredAt)}
                                                </p>
                                                <div
                                                    id="2_636"
                                                    className="Pixso-frame-2_636 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                                >
                                                    <div
                                                        id="2_637"
                                                        className="Pixso-frame-2_637 pixso-relative-no-shrink"
                                                    ></div>
                                                    <div
                                                        id="2_638"
                                                        className="Pixso-frame-2_638 pixso-relative-no-shrink"
                                                    ></div>
                                                    <div
                                                        id="2_639"
                                                        className="Pixso-frame-2_639 pixso-relative-no-shrink"
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    id="2_640"
                                    className="Pixso-frame-2_640 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                >
                                    <div
                                        id="2_641"
                                        className="stroke-wrapper-2_641 pixso-relative-flex-auto-size pixso-flex-shrink-0"
                                    >
                                        <div
                                            className={`pixso-relative-no-shrink pixso-flex ${
                                                isCoral(h.grade) ? "Pixso-frame-2_655" : "Pixso-frame-2_641"
                                            }`}
                                        >
                                            <p
                                                id="2_642"
                                                className={`pixso-relative-auto-size pixso-flex-shrink-0 ${
                                                    isCoral(h.grade) ? "Pixso-paragraph-2_656" : "Pixso-paragraph-2_642"
                                                }`}
                                            >
                                                {h.grade}
                                            </p>
                                        </div>
                                        <div
                                            className={isCoral(h.grade) ? "stroke-2_655" : "stroke-2_641"}
                                        ></div>
                                    </div>
                                    <div
                                        id="2_643"
                                        className="Pixso-vector-2_643 pixso-relative-no-shrink"
                                    ></div>
                                </div>
                            </div>
                        </div>
                        ))}
                        <div ref={sentinelRef} />
                        </>
                        )}
                    </div>
                </div>
                <div
                    style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 60 }}
                    id="2_687"
                    className="Pixso-frame-2_687 pixso-relative-no-shrink pixso-flex-auto-height"
                >
                    <div className="frame-content-2_687 pixso-relative-flex">
                        <div
                            id="2_688"
                            className="stroke-wrapper-2_688 pixso-relative-no-shrink pixso-flex"
                        >
                            <div className="Pixso-frame-2_688 effect-effectcardshadow-2_19 pixso-relative-no-shrink pixso-flex"></div>
                            <div className="stroke-2_688"></div>
                            <div className="Pixso-frame-2_688-content-layer">
                                <div className="frame-content-2_688 pixso-relative-flex">
                                    <div
                                        onClick={() => navigate("/tasks")}
                                        id="2_689"
                                        className="Pixso-frame-2_689 pixso-relative-flex"
                                    >
                                        <div className="frame-content-2_689 pixso-relative-flex">
                                            <div
                                                id="2_690"
                                                className="Pixso-frame-2_690 pixso-relative-no-shrink pixso-flex"
                                            >
                                                <div className="frame-content-2_690 pixso-relative-flex">
                                                    <div
                                                        id="2_691"
                                                        className="Pixso-vector-2_691 pixso-relative-no-shrink"
                                                    ></div>
                                                </div>
                                            </div>
                                            <p
                                                id="2_694"
                                                className="Pixso-paragraph-2_694 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {"首页"}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => navigate("/practice")}
                                        id="2_695"
                                        className="Pixso-frame-2_695 pixso-relative-flex"
                                    >
                                        <div className="frame-content-2_695 pixso-relative-flex">
                                            <div
                                                id="2_696"
                                                className="Pixso-frame-2_696 pixso-relative-no-shrink pixso-flex"
                                            >
                                                <div className="frame-content-2_696 pixso-relative-flex">
                                                    <div
                                                        id="2_697"
                                                        className="Pixso-vector-2_697 pixso-relative-no-shrink"
                                                    ></div>
                                                </div>
                                            </div>
                                            <p
                                                id="2_700"
                                                className="Pixso-paragraph-2_700 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {"练习"}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => navigate("/interview")}
                                        id="2_701"
                                        className="Pixso-frame-2_701 pixso-relative-flex"
                                    >
                                        <div className="frame-content-2_701 pixso-relative-flex">
                                            <div
                                                id="2_702"
                                                className="Pixso-frame-2_702 pixso-relative-no-shrink pixso-flex"
                                            >
                                                <div className="frame-content-2_702 pixso-relative-flex">
                                                    <div
                                                        id="2_703"
                                                        className="Pixso-frame-2_703 pixso-relative-no-shrink"
                                                    >
                                                        <div
                                                            id="2_704"
                                                            className="Pixso-vector-2_704"
                                                        ></div>
                                                        <div
                                                            id="2_705"
                                                            className="stroke-wrapper-2_705"
                                                        >
                                                            <div className="Pixso-rectangle-2_705 pixso-position-relative"></div>
                                                            <div className="stroke-2_705"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <p
                                                id="2_706"
                                                className="Pixso-paragraph-2_706 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {"面试"}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => navigate("/sediment")}
                                        id="2_707"
                                        className="Pixso-frame-2_707 pixso-relative-flex"
                                    >
                                        <div className="frame-content-2_707 pixso-relative-flex">
                                            <div
                                                id="2_708"
                                                className="Pixso-frame-2_708 pixso-relative-no-shrink pixso-flex"
                                            >
                                                <div className="frame-content-2_708 pixso-relative-flex">
                                                    <div
                                                        id="2_709"
                                                        className="Pixso-vector-2_709 pixso-relative-no-shrink"
                                                    ></div>
                                                </div>
                                            </div>
                                            <p
                                                id="2_713"
                                                className="Pixso-paragraph-2_713 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {"沉淀"}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => navigate("/me")}
                                        id="2_714"
                                        className="Pixso-frame-2_714 pixso-relative-flex"
                                    >
                                        <div className="frame-content-2_714 pixso-relative-flex">
                                            <div
                                                id="2_715"
                                                className="Pixso-frame-2_715 pixso-relative-no-shrink pixso-flex"
                                            >
                                                <div className="frame-content-2_715 pixso-relative-flex">
                                                    <div
                                                        id="2_716"
                                                        className="Pixso-vector-2_716 pixso-relative-no-shrink"
                                                    ></div>
                                                </div>
                                            </div>
                                            <p
                                                id="2_719"
                                                className="Pixso-paragraph-2_719 pixso-relative-auto-size pixso-flex-shrink-0"
                                            >
                                                {"我的"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Frame2579;
