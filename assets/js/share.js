(function () {
  function getShareUrl(url) {
    return url || window.location.href;
  }

  function showShareMessage(message, container) {
    const target = container || document.body;
    let notice = target.querySelector('.share-notice');
    if (!notice) {
      notice = document.createElement('p');
      notice.className = 'share-notice';
      notice.setAttribute('role', 'status');
      target.appendChild(notice);
    }
    notice.textContent = message;
  }

  function showCopyFallback(text, container) {
    const target = container || document.body;
    let field = target.querySelector('.share-fallback');
    if (!field) {
      field = document.createElement('textarea');
      field.className = 'share-fallback';
      field.readOnly = true;
      field.setAttribute('aria-label', 'Share text');
      target.appendChild(field);
    }
    field.value = text;
    field.hidden = false;
    field.select();
    showShareMessage(typeof translate === 'function' ? translate('game_copyManual') : 'Copy the text above.', target);
  }

  function copyGameLink(text, options) {
    const config = options || {};
    const copyText = text || getShareUrl(config.url);
    const successMessage = config.successMessage || (typeof translate === 'function' ? translate('game_linkCopied') : 'Link copied.');

    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(copyText)
        .then(() => showShareMessage(successMessage, config.container))
        .catch(() => showCopyFallback(copyText, config.container));
    }

    try {
      const field = document.createElement('textarea');
      field.value = copyText;
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      const copied = document.execCommand('copy');
      document.body.removeChild(field);
      if (copied) {
        showShareMessage(successMessage, config.container);
        return Promise.resolve();
      }
    } catch (error) {
      // A visible manual-copy field is provided below.
    }

    showCopyFallback(copyText, config.container);
    return Promise.resolve();
  }

  function shareGameResult(options) {
    const config = options || {};
    const url = getShareUrl(config.url);
    const data = {
      title: config.title || document.title,
      text: config.text || '',
      url: url
    };
    const fullText = data.text ? data.text + '\n\n' + url : url;

    if (navigator.share) {
      return navigator.share(data)
        .catch((error) => {
          if (error && error.name === 'AbortError') return;
          return copyGameLink(fullText, config);
        });
    }

    return copyGameLink(fullText, config);
  }

  window.shareGameResult = shareGameResult;
  window.copyGameLink = copyGameLink;
})();