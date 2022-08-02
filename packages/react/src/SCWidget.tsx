import {
  ComponentProps,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { LoadOptions, Widget, WidgetOptions } from 'soundcloud-embed';

export interface SCWidgetProps
  extends ComponentProps<'iframe'>,
    Partial<Exclude<WidgetOptions, 'iframe'>> {
  loadOnStart?: {
    uri: string;
    options?: LoadOptions;
  };
}

export type SCWidgetHandler = Widget;

export default forwardRef<SCWidgetHandler, SCWidgetProps>(
  ({ useDefaultStyle, invokeTimeout, loadOnStart, ...props }, ref) => {
    const iframe = useRef<HTMLIFrameElement>(null);

    const widget = useRef<Widget>(new Widget({ invokeTimeout }));
    useImperativeHandle(ref, () => widget.current, [widget]);

    useEffect(() => {
      if (!iframe.current || !widget.current) return;
      widget.current.iframe = iframe.current;
      widget.current.invokeTimeout = invokeTimeout || 5e3;
      if (loadOnStart)
        widget.current.loadFromURI(loadOnStart.uri, loadOnStart.options);
    }, [iframe]);

    return (
      <iframe
        ref={iframe}
        {...(useDefaultStyle
          ? { frameBorder: 'now', width: '100%', height: '166px' }
          : {})}
        {...props}
      />
    );
  },
);
