import Ul from '../../src/tags/ul'
import Ol from "../../src/tags/ol";

describe("test <ul></ul> tag",()=>{

  it('unorder list',()=>{
    let ul=new Ul('<ul>\n' +
      '<li>one</li>\n' +
      '<li>two</li>\n' +
      '<li>three</li>\n' +
      '</ul>')
    expect(ul.execMerge()).toBe('\n' +
      '* one\n' +
      '* two\n' +
      '* three\n')
  })

  it('nest ul',()=>{
    let ul=new Ul('<ul>\n' +
      '<li>one</li>\n' +
      '<li>two\n' +
      '<ul>\n' +
      '<li>one</li>\n' +
      '<li>two</li>\n' +
      '<li>three</li>\n' +
      '</ul>\n' +
      '</li>\n' +
      '<li>three</li>\n' +
      '</ul>')
    expect(ul.execMerge()).toBe('\n' +
      '* one\n' +
      '* two\n' +
      '    * one\n' +
      '    * two\n' +
      '    * three\n' +
      '* three\n')
  })


  it('nest ol',()=>{
    let ul=new Ul('<ul>\n' +
      '<li>one</li>\n' +
      '<li>two\n' +
      '<ol>\n' +
      '<li>unorder-1</li>\n' +
      '<li>unorder-2</li>\n' +
      '<li>unorder-3</li>\n' +
      '</ol>\n' +
      '</li>\n' +
      '<li>three</li>\n' +
      '</ul>')
    expect(ul.execMerge()).toBe('\n' +
      '* one\n' +
      '* two\n' +
      '    1. unorder-1\n' +
      '    2. unorder-2\n' +
      '    3. unorder-3\n' +
      '* three\n')
  })

  it('complicate nest',()=>{
    let ul=new Ul('<ul>\n' +
      '<li><strong>STRONG</strong></li>\n' +
      '<li><a href="https://github.com/-it/markdown-it-sub">ATag</a>\n' +
      '<ol>\n' +
      '<li>unorder-1</li>\n' +
      '<li>unorder-2\n' +
      '<ul>\n' +
      '<li>one</li>\n' +
      '<li>two\n' +
      '<blockquote>\n' +
      '<ol>\n' +
      '<li>bq-nest-1</li>\n' +
      '</ol>\n' +
      '<blockquote>\n' +
      '<ol>\n' +
      '<li>bq-nest-2</li>\n' +
      '</ol>\n' +
      '<blockquote>\n' +
      '<ol>\n' +
      '<li>bq-nest-3</li>\n' +
      '</ol>\n' +
      '</blockquote>\n' +
      '</blockquote>\n' +
      '</blockquote>\n' +
      '</li>\n' +
      '</ul>\n' +
      '</li>\n' +
      '<li>unorder-3\n' +
      '<ol>\n' +
      '<li>code<pre class="hljs language-javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>)</span>{\n' +
      '    <span class="hljs-keyword">let</span> b=<span class="hljs-number">5</span>\n' +
      '    <span class="hljs-keyword">let</span> obj={\n' +
      '            <span class="hljs-attr">x</span>:<span class="hljs-number">100</span>\n' +
      '        }\n' +
      '    <span class="hljs-keyword">return</span> obj.x+b\n' +
      '}\n' +
      '</code></pre>\n' +
      '</li>\n' +
      '</ol>\n' +
      '</li>\n' +
      '</ol>\n' +
      '</li>\n' +
      '<li>three</li>\n' +
      '</ul>')
    expect(ul.execMerge()).toBe('\n' +
      '* **STRONG**\n' +
      '* [ATag](https://github.com/-it/markdown-it-sub)\n' +
      '    1. unorder-1\n' +
      '    2. unorder-2\n' +
      '        * one\n' +
      '        * two\n' +
      '            >1. bq-nest-1\n' +
      '            >>1. bq-nest-2\n' +
      '            >>>1. bq-nest-3\n' +
      '    3. unorder-3\n' +
      '        1. code\n' +
      '            ```javascript\n' +
      '            function a(){\n' +
      '                let b=5\n' +
      '                let obj={\n' +
      '                        x:100\n' +
      '                    }\n' +
      '                return obj.x+b\n' +
      '            }\n' +
      '            ```\n' +
      '* three\n')
  })

  it("li nest p",()=>{
    let ul=new Ul("<ul>\n" +
      "<li>\n" +
      "<p>Lorem ipsum dolor sit amet</p>\n" +
      "</li>\n" +
      "<li>\n" +
      "<p>Consectetur adipiscing elit</p>\n" +
      "</li>\n" +
      "<li>\n" +
      "<p>Integer molestie lorem at massa</p>\n" +
      "</li>\n" +
      "<li>\n" +
      "<p>You can use sequential numbers…</p>\n" +
      "</li>\n" +
      "<li>\n" +
      "<p>…or keep all the numbers as <code>1.</code></p>\n" +
      "</li>\n" +
      "</ul>")

    expect(ul.execMerge()).toBe("\n" +
      "* Lorem ipsum dolor sit amet\n" +
      "* Consectetur adipiscing elit\n" +
      "* Integer molestie lorem at massa\n" +
      "* You can use sequential numbers…\n" +
      "* …or keep all the numbers as `1.`\n")
  })
})
