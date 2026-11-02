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

//TODO: Requirements List (each should be a commit of its own, including bugs you fix)
// // maximise your commits to make yourself and github graph look much better.

// // each of the below requirements should be its own commit.
// // and if you come accross a bug or need to do a work around to get something working then make another commit for that.

// - sidebar
//    - defualtwidth: 250px
//    - maxwidth: 330px
//    - minwidth: 220px then collapse on anything smaller.
// const LEFT_PANEL_DEFAULT_WIDTH_PIXELS = 250;
// const LEFT_PANEL_MAX_WIDTH_PIXELS = 330;
// const LEFT_PANEL_MIN_WIDTH_PIXELS = 220;

// const RIGHT_PANEL_DEFAULT_WIDTH_PIXELS = 440;
// const RIGHT_PANEL_MAX_WIDTH_PIXELS = 600;
// const RIGHT_PANEL_MIN_WIDTH_PIXELS = 360;

// - braindump
//    - defualtwidth: 440px
//    - maxwidth: 600px
//    - minwidth: 360px never collapse.

//TODO:[DONE] - sidebar panelresizehandle loses styles when dragging and mouse isnt on top of it.
//TODO:[DONE] - panelresizehandle is hard to drag. maybe make the ::before element look like the panelresizehandle  and make panelresizehandle invisible a wider.
//TODO:[DONE] - animate collapse with drag.

//?                              DO THESE TODAY:
// TODO:[DONE] Clean up the code and commit it before working on the next features listed below.

//// - make sidebar animate in from left on hover when it's collapsed. like linear.


// - add open/close icon buttons for both side panels

// - animate close/open icons for both side panels like linear
// - follow this guide: https://www.joshwcomeau.com/svg/friendly-introduction-to-svg/
// - experiment here: https://codepen.io/Abdimajid_Shire/pen/yyYPGGd
// - tldr: i think you can do this trick my animating the width of a rectangle svg element.

// - add mobile styles
// - add swiping functionality for mobile version.
//    - this can be easily be done with css.
//        - watch: https://www.reddit.com/r/webdev/comments/v1rjlk/how_do_nike_and_apple_make_such_smooth_and_touch/
//        - and this https://www.youtube.com/watch?v=YBkvuXpc_wo
//        - and this: https://www.youtube.com/shorts/5xpRIdytbKQ
//    - [use only if the above fails]don't make life hard and just use this lib: https://github.com/davidjerleke/embla-carousel
//

// - set the autoSave prop on the panelGroup to save layout in localstorage.

// - confirm semantic html usage.

//[can skip] add ipad styles:
// make it behave like linear does on smaller screens.

// side note:[only if it's easy to do]  copy linear and use '[' key to open and close sidebar and ']' key to open and close braindump.

//

// create a decision flow for when to use which hook and where.

// understand react lifecycle
// watch bro code useRef vid.

// watch bro code useEffect vid.
// understand how to make custom hooks.
// react juinior mistakes by bytegrad
// react best practices by bytegrad

// learn how this code flows. (what get run fisrt and why and why do we have to do so many null checks)
// learn when to use refs vs state. and write this shit down in your notes.

//

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
    // this take a prop 'keyboardResizeBy' maybe use it to add the keyboard shortcut
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
        <div className={styles["sidebar-content-container"]}>Sidebar</div>
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
