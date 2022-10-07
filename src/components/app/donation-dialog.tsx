import style from "./donation-dialog.module.scss"

import React from "react";
import { observer } from "mobx-react";
import { adgoalSkip } from "../../background/adgoal";
import { Dialog, DialogProps } from "../dialog";
import { getMessage } from "../../i18n";
import { cssNames } from "../../utils";
import { Icon } from "../icon";
import { Button } from "../button";

@observer
export class DonationDialog extends React.Component<DialogProps> {
  #btcWallet = '1FuwS2M3JpwGRdZqh5kZZtcM36788xthu6';
  #ethWallet = '0x86ef84b008cf69fa5479e87f1ae82c5d1c47164b';

  async componentDidMount() {
    await adgoalSkip.load();
  }

  private copyToBuffer(text: string) {
    return navigator.clipboard.writeText(text);
  }

  render() {
    const { className, contentClassName, ...dialogProps } = this.props;

    return (
      <Dialog
        {...dialogProps}
        className={cssNames(style.DonationDialog, className)}
        contentClassName={cssNames(style.content, contentClassName)}
      >
        <p>{getMessage("donate_description")}</p>
        <p>
          <b>BTC</b>: {this.#btcWallet}<br/>
          <Icon
            material="content_copy"
            onClick={() => this.copyToBuffer(this.#btcWallet)}
            tooltip={getMessage("donate_copy_wallet")}
          />
          <em>(Bitcoin network)</em>
        </p>
        <p>
          <b>ETH</b>: {this.#ethWallet} <br/>
          <Icon
            material="content_copy"
            onClick={() => this.copyToBuffer(this.#ethWallet)}
            tooltip={getMessage("donate_copy_wallet")}
          />
          <em>(ERC20 network)</em>
        </p>
        <hr/>
        <div className="flex column gaps">
          <div className="flex gaps">
            <Icon material="info_outline"/>
            <small>
              Our extension is in a partnership with <a href="https://adgoal.de/" target="_blank">Adgoal</a> and contains their Adgoal script meant for link affiliation.
              We can receive a reward for sales that happen after users click on the affiliate links.
              You can learn more about the process in Adgoal’s <a href="https://www.adgoal.de/en/privacy.html" target="_blank">privacy policy</a>.
              The ads associated with this partnership do not interfere with any third-party website, in-app, or native advertising in any way.
            </small>
          </div>
          <div className="flex gaps">
            <small>
              If you experiencing constant issues with wrong redirects from search engines or anything weird from Adgoal, then you could disable this affiliation program.
            </small>
            <Button
              label={adgoalSkip.get() ? "Enable" : "Disable"}
              onClick={() => adgoalSkip.set(!adgoalSkip.get())}
            />
          </div>
        </div>
      </Dialog>
    );
  }
}
