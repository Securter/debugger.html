/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at <http://mozilla.org/MPL/2.0/>. */

import { isFirefox } from "devtools-config";

function scrollList(resultList, index) {
  if (!resultList.hasOwnProperty(index)) {
    return;
  }

  const resultEl = resultList[index];

  if (isFirefox()) {
    resultEl.scrollIntoView({ block: "center", behavior: "smooth" });
  } else {
    chromeScrollList(resultEl, index);
  }
}

function chromeScrollList(elem, index) {
  const resultsEl = elem.parentNode;
  if (!resultsEl || resultsEl.children.length === 0) {
    return;
  }

  const resultsHeight = resultsEl.clientHeight;
  const itemHeight = resultsEl.children[0].clientHeight;
  const numVisible = resultsHeight / itemHeight;
  const positionsToScroll = index - numVisible + 1;
  const itemOffset = resultsHeight % itemHeight;
  const scroll = positionsToScroll * (itemHeight + 2) + itemOffset;

  resultsEl.scrollTop = Math.max(0, scroll);
}

export { scrollList };
