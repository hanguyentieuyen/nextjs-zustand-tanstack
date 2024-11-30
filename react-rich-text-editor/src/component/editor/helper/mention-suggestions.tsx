import { ReactRenderer, Editor } from '@tiptap/react'
import tippy, { Instance, Props, GetReferenceClientRect } from 'tippy.js'

import RenderMentionList from './mention-list'

interface RenderProps {
  editor: Editor
  clientRect: GetReferenceClientRect
}

const MentionSuggestion = (mentionList: string[]) => {
  const items = ({ query }: { query: string }) => {
    return mentionList.filter((item: string) => item.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5)
  }

  const render = () => {
    let reactRenderer: ReactRenderer
    let popup: Instance<Props>[]

    return {
      onStart: (props: RenderProps) => {
        reactRenderer = new ReactRenderer(RenderMentionList, {
          props,
          editor: props.editor
        })

        if (!props.clientRect) {
          return
        }

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: reactRenderer.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start'
        })
      },

      onUpdate(props: RenderProps) {
        reactRenderer.updateProps(props)

        if (!props.clientRect) {
          return
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect
        })
      },

      onKeyDown(props: { event: KeyboardEvent }) {
        if (props.event.key === 'Escape') {
          popup[0].hide()
          return true
        }

        return (reactRenderer.ref as any).onKeyDown(props)
      },

      onExit() {
        popup[0].destroy()
        reactRenderer.destroy()
      }
    }
  }

  return {
    items,
    render
  }
}

export default MentionSuggestion
