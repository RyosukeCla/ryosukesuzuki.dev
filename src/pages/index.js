import React from 'react'
import * as d3 from 'd3'
import Layout from '../components/layouts/default'
import myTree from '../data/myTree'

class IndexPage extends React.Component {
  componentDidMount() {
    const width = 750
    const radius = width / 2
    const tree = d3.cluster().size([2 * Math.PI, radius - 100])
    const root = tree(d3.hierarchy(myTree))

    const svg = d3
      .select('#mytree')
      .style('opacity', '0')
      .style('transition', 'opacity 1s')
      .style('width', '100%')
      .style('max-width', '650px')
      .style('height', 'auto')
      .style('padding', '10px')
      .style('box-sizing', 'border-box')
      .style('font', '10px sans-serif')

    const g = svg.append('g')

    g.append('g')
      .attr('fill', 'none')
      .attr('stroke', '#555')
      .attr('stroke-opacity', 0.3)
      .attr('stroke-width', 1.5)
      .selectAll('path')
      .data(root.links())
      .enter()
      .append('path')
      .attr(
        'd',
        d3
          .linkRadial()
          .angle(d => d.x)
          .radius(d => d.y)
      )

    const node = g
      .append('g')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-width', 3)
      .selectAll('g')
      .data(root.descendants().reverse())
      .enter()
      .append('g')
      .attr(
        'transform',
        d => `
        rotate(${(d.x * 180) / Math.PI - 90})
        translate(${d.y},0)
      `
      )

    node
      .append('circle')
      .attr('fill', d => {
        const rate = (d.data.depth / myTree.depth) * 0.5 + 0.5
        return `rgba(${120 * rate}, ${50 * rate}, ${255 * rate})`
      })
      .attr('r', d => {
        if (d.data.root) {
          return 11
        }
        const rate = d.data.depth / myTree.depth
        return 2.5 + rate * 1.5
      })

    node
      .append('text')
      .attr('dy', '0.31em')
      .attr('x', d => {
        if (d.data.root) return 0
        return d.x < Math.PI === !d.children ? 6 : -6
      })
      .attr('text-anchor', d => {
        if (d.data.root) return 'middle'
        return d.x < Math.PI === !d.children ? 'start' : 'end'
      })
      .attr('transform', d => (d.x >= Math.PI ? 'rotate(180)' : null))
      .text(d => d.data.name)
      .style('fill', d => {
        if (d.data.root) return 'white'
        return 'black'
      })
      .filter(d => d.children)
      .clone(true)
      .lower()
      .attr('stroke', 'white')

    const box = g.node().getBBox()
    svg
      .attr('widht', box.width)
      .attr('height', box.height)
      .attr('viewBox', `${box.x} ${box.y} ${box.width} ${box.height}`)
      .style('opacity', '1')
  }

  render() {
    const rowStyle = {
      minHeight: 'calc(100vh - 160px)',
    }
    const columnStyle = {
      width: '100%',
    }
    return (
      <Layout>
        <div className="uk-flex uk-flex-center uk-flex-middle" style={rowStyle}>
          <div
            className="uk-flex uk-flex-column uk-flex-center uk-flex-middle"
            style={columnStyle}
          >
            <svg id="mytree" />
          </div>
        </div>
      </Layout>
    )
  }
}

export default IndexPage
