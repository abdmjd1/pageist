import styles from "./HomePageLayout.module.css";
import { RefObject, useRef, useState } from "react";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  ImperativePanelHandle,
  customizeGlobalCursorStyles,
  type CustomCursorStyleConfig,
} from "react-resizable-panels";
import useWindowSize from "../../hooks/useWindowSize";
import Button from "../ui/Button/Button";

const LEFT_PANEL_DEFAULT_WIDTH_PIXELS = 250;
const LEFT_PANEL_MAX_WIDTH_PIXELS = 330;
const LEFT_PANEL_MIN_WIDTH_PIXELS = 220;

const MAIN_PANEL_MIN_WIDTH_PIXELS = 590;

const RIGHT_PANEL_DEFAULT_WIDTH_PIXELS = 0;
const RIGHT_PANEL_MAX_WIDTH_PIXELS = 440;
const RIGHT_PANEL_MIN_WIDTH_PIXELS = 330;

type PanelRefType = ImperativePanelHandle | null;
type ResizingPanel = "left-panel" | "right-panel" | null;

function HomePageLayout({ children }: { children: React.ReactNode }) {
  const { windowWidth } = useWindowSize();
  const [panelBeingResized, setPanelBeingResized] =
    useState<ResizingPanel>(null);

  const [leftPanelSize, setLeftPanelSize] = useState(
    LEFT_PANEL_DEFAULT_WIDTH_PIXELS
  );
  const [rightPanelSize, setRightPanelSize] = useState(
    RIGHT_PANEL_DEFAULT_WIDTH_PIXELS
  );

  const rightPanelRef = useRef<PanelRefType>(null);
  const leftPanelRef = useRef<PanelRefType>(null);

  const shouldTransitionLeftPanel =
    leftPanelSize <= LEFT_PANEL_MIN_WIDTH_PIXELS &&
    panelBeingResized === "left-panel";

  const handleLayoutChange = (sizes: number[]) => {
    const newLeftPanelSize = (sizes[0] / 100) * windowWidth;
    const newRightPanelSize = (sizes[2] / 100) * windowWidth;

    setLeftPanelSize(newLeftPanelSize);
    setRightPanelSize(newRightPanelSize);
  };

  return (
    <PanelGroup
      direction="horizontal"
      // autoSaveId={"home-page-layout"}
      onLayout={handleLayoutChange}
    >
      <Panel
        ref={leftPanelRef}
        tagName="aside"
        defaultSize={(LEFT_PANEL_DEFAULT_WIDTH_PIXELS / windowWidth) * 100}
        minSize={(LEFT_PANEL_MIN_WIDTH_PIXELS / windowWidth) * 100}
        maxSize={(LEFT_PANEL_MAX_WIDTH_PIXELS / windowWidth) * 100}
        collapsible
        className={[
          styles["panel"],
          styles["panel--left-panel"],
          (panelBeingResized === null || shouldTransitionLeftPanel) &&
            styles["panel--toggle-transition"],
        ].join(" ")}
      >
        Sidebar
      </Panel>
      <PanelResizeHandle
        onDragging={(isDragging) => {
          setPanelBeingResized(isDragging ? "left-panel" : null);
        }}
        hitAreaMargins={{ coarse: 0, fine: 0 }}
        className={[
          styles["resize-handle"],
          styles["resize-handle--left-panel"],
          panelBeingResized === "left-panel" &&
            styles["resize-handle--dragging"],
        ].join(" ")}
      />

      <Panel
        tagName="main"
        defaultSize={
          100 -
          ((LEFT_PANEL_DEFAULT_WIDTH_PIXELS / windowWidth) * 100 +
            (RIGHT_PANEL_DEFAULT_WIDTH_PIXELS / windowWidth) * 100)
        }
        minSize={(MAIN_PANEL_MIN_WIDTH_PIXELS / windowWidth) * 100}
        className={[
          styles["main-panel"],
          (panelBeingResized === null || shouldTransitionLeftPanel) &&
            styles["panel--toggle-transition"],
        ].join(" ")}
      >
        <header>
          <Button onClick={() => togglePanel(leftPanelRef)}>
            toggle sidebar
          </Button>
          <Button onClick={() => togglePanel(rightPanelRef)}>
            toggle braindump
          </Button>
        </header>
        {children}
      </Panel>

      <PanelResizeHandle
        onDragging={(isDragging) =>
          setPanelBeingResized(isDragging ? "right-panel" : null)
        }
        hitAreaMargins={{ coarse: 0, fine: 0 }}
        disabled={rightPanelSize === 0}
        className={[
          styles["resize-handle"],
          styles["resize-handle--right-panel"],
          rightPanelSize === 0 && styles["resize-handle--disabled"],
          panelBeingResized === "right-panel" &&
            styles["resize-handle--dragging"],
        ].join(" ")}
      />

      <Panel
        ref={rightPanelRef}
        tagName="aside"
        defaultSize={(RIGHT_PANEL_DEFAULT_WIDTH_PIXELS / windowWidth) * 100}
        minSize={(RIGHT_PANEL_MIN_WIDTH_PIXELS / windowWidth) * 100}
        maxSize={(RIGHT_PANEL_MAX_WIDTH_PIXELS / windowWidth) * 100}
        collapsible={panelBeingResized !== "right-panel"}
        className={[
          styles["panel"],
          styles["panel--right-panel"],
          panelBeingResized === null && styles["panel--toggle-transition"],
        ].join(" ")}
      >
        Braindump
      </Panel>
      {/* <Braindump /> */}
    </PanelGroup>
  );
}

export default HomePageLayout;

function customCursor({ isPointerDown }: CustomCursorStyleConfig) {
  return isPointerDown ? "col-resize" : "col-resize";
}

customizeGlobalCursorStyles(customCursor);

const togglePanel = (targetPanelRef: RefObject<PanelRefType>) => {
  if (!targetPanelRef.current) return;
  if (targetPanelRef.current.isCollapsed()) targetPanelRef.current.expand();
  else targetPanelRef.current.collapse();
};
