import "./app-rate.dialog.scss";

import React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { Dialog } from "../dialog";
import { Button } from "../button";
import { Icon } from "../icon";
import { __i18n } from "../../extension";
import { getAppStoreUrl, rateButtonClicked, rateLastTimestamp } from "../../common";

@observer
export class AppRateDialog extends React.Component {
  @observable isOpen = false;

  constructor(props) {
    super(props);
    this.visibilityCheck();
  }

  visibilityCheck = () => {
    var isRated = rateButtonClicked.get();
    var delayLastTime = rateLastTimestamp.get();
    var delayDuration = 1000 * 60 * 60 * 24 * 7; // 1 week
    var isHidden = isRated || (delayLastTime + delayDuration > Date.now());
    this.isOpen = !isHidden;
  }

  rateApp = () => {
    window.open(getAppStoreUrl());
    rateButtonClicked.set(true);
    this.close();
  }

  remindLater = () => {
    rateLastTimestamp.set(Date.now());
    this.close();
  }

  close() {
    this.isOpen = false;
  }

  render() {
    return (
      <Dialog pinned className="AppRateDialog" isOpen={this.isOpen}>
        <h4>{__i18n("rate_app_info1")}</h4>
        <p>{__i18n("rate_app_info2")}</p>

        <div className="buttons flex gaps justify-center">
          <Button autoFocus primary onClick={this.rateApp} className="flex align-center">
            <Icon small material="star_rate"/>
            <span>{__i18n("rate_app_button")}</span>
          </Button>
          <Button accent onClick={this.remindLater} className="flex align-center">
            <Icon small material="timer"/>
            <span>{__i18n("rate_app_button_later")}</span>
          </Button>
        </div>
      </Dialog>
    );
  }
}
