import React from 'react'
import { withTranslation } from 'react-i18next'
import Select from 'react-select'
import { Tab } from '@headlessui/react'
import CoverImage from './CoverImage'
import ComponentToImg from './ComponentToImg'
import RandomTheme from './RandomTheme'
import { ImgProvider } from '../utils/ImgContext'
import Header from './Header'
import theme1 from '../assets/images/theme1.webp'
import theme2 from '../assets/images/theme2.webp'
import theme3 from '../assets/images/theme3.webp'
import theme4 from '../assets/images/theme4.webp'
import theme5 from '../assets/images/theme5.webp'
import theme6 from '../assets/images/theme6.webp'
import theme7 from '../assets/images/theme7.webp'
import fixitIcon from '../assets/icons/fixit.svg'

const defaultSettings = {
  title: 'A begineers guide to frontend development',
  bgColor: '#949ee5',
  pattern: '',
  author: process.env.REACT_APP_AUTHOR || 'PangXf',
  icon: { label: 'reactjs', value: 'react', opts: ['original', 'original-wordmark'] },
  iconStyle: 'original',
  iconStyleOptions: ['original', 'original-wordmark'],
  devIconOptions: [],
  font: 'font-Virgil',
  theme: 'background',
  customIcon: '',
  platform: 'hashnode',
  customPlatformWidth: 1024,
  customPlatformX: 0,
  customPlatformY: 0,
}

const fontOptions = [
  'font-Virgil',
  'font-MMT',
  'font-Anek',
  'font-Inter',
  'font-mono',
  'font-Poppins',
  'font-sans',
  'font-serif',
]

const patternOptions = [
  'none',
  'graph-paper',
  'jigsaw',
  'hideout',
  'dots',
  'falling-triangles',
  'circuit-board',
  'temple',
  'anchors',
  'brickwall',
  'overlapping-circles',
  'wiggle',
  'tic-tac-toe',
  'leaf',
  'bubbles',
  'squares',
  'explorer',
  'jupiter',
  'sun',
]

const platformOptions = [
  { label: 'Hashnode', value: 'hashnode' },
  { label: 'Dev.to', value: 'dev' },
  { label: 'Hugo FixIt', value: 'hugo-fixit' },
  { label: '稀土掘金', value: 'juejin' },
  { label: '16:9', value: 'size-16:9' },
  { label: '5:4', value: 'size-5:4' },
  { label: '7:5', value: 'size-7:5' },
  { label: '4:3', value: 'size-4:3' },
  { label: '5:3', value: 'size-5:3' },
  { label: '3:2', value: 'size-3:2' },
  { label: '2:1', value: 'size-2:1' },
  { label: '1:1', value: 'size-1:1' },
]

const themeOptions = [
  { name: 'background', src: theme7 },
  { name: 'basic', src: theme1 },
  { name: 'modern', src: theme2 },
  { name: 'stylish', src: theme3 },
  { name: 'outline', src: theme5 },
  { name: 'preview', src: theme4 },
  { name: 'mobile', src: theme6 },
]

const devIconsUrl = 'https://raw.githubusercontent.com/devicons/devicon/master/devicon.json'
class Editor extends React.Component {
  state = defaultSettings

  componentDidMount() {
    const defaultDevIconOptions = [
      { label: this.props.t('editor.custom'), value: 'custom', opts: []},
      { label: 'Hugo FixIt', value: 'hugo-fixit', opts: [] },
    ]
    this.setState({ devIconOptions: defaultDevIconOptions })
    fetch(devIconsUrl)
      .then((r) => r.json())
      .then((data) => {
        this.setState({ devIconOptions: [
          ...defaultDevIconOptions,
          ...data.map((icon) => ({
            label: icon.altnames[0] ?? icon.name,
            value: icon.name,
            // 后续如有需要可以放开所有风格的图标进行选择
            opts: icon.versions.svg,
          })),
        ]})
        // 保存 devIconOptions 到默认配置中，并保存到 localStorage 中
        defaultSettings.devIconOptions = this.state.devIconOptions
        localStorage.setItem('devIconOptions', JSON.stringify(this.state.devIconOptions))
      }).catch((e) => {
        console.error('Failed to fetch devicons', e)
        const devIconOptions = localStorage.getItem('devIconOptions')
        if (devIconOptions) {
          this.setState({ devIconOptions: JSON.parse(devIconOptions) })
          console.log('Detected devIconOptions from localStorage')
        }
      })
  }

  handleSelectPlatform = (e) => {
    this.setState({ platform: e.target.value })
    if (e.target.value === 'hugo-fixit') {
      this.setState({ icon: { label: 'Hugo FixIt', value: 'hugo-fixit' }})
    }
  }

  handleReset = () => {
    this.setState(defaultSettings)
  }

  getRandomTheme = (theme, Pattern) => {
    this.setState({ bgColor: theme.bgColor, borderColor: theme.bdColor, pattern: Pattern })
  }

  formatOptionLabel = ({ value, label, opts }) => (
    <div className="flex items-center">
      <span className="mr-2">{label}</span>
      <div className="ml-auto mr-2">
        {value !== 'custom' && (
          <img
            alt={`${label} Icon`}
            className="w-6 h-6"
            src={ value === 'hugo-fixit'
              ? fixitIcon
              : `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${value}/${value}-${opts[0]}.svg`
            }
          />
        )
        }
      </div>
    </div>
  )

  _getFontStyle = () => {
    let fontStyle = ''
    switch (this.state.font) {
      case 'font-Virgil':
        fontStyle =
        `
          @font-face {
            font-family: 'Virgil';
            font-display: swap;
            src: url(https://virgil.excalidraw.com/Virgil.woff2) format('woff2');
          }
        `
        break
      case 'font-MMT':
        fontStyle =
        `
          @font-face {
            font-family: 'MMT';
            font-display: swap;
            src: url(https://lruihao.cn/fonts/mmt_1.5.ttf) format('woff2');
          }
        `
        break
    }
    if (fontStyle) {
      fontStyle = fontStyle.replace(/\s+/g, ' ')
      return <style>{fontStyle}</style>
    }
  }

  render() {
    const { t } = this.props

    return (
      <div className="flex flex-col h-full">
        <Header />

        <ImgProvider>
          <div className="flex flex-col lg:flex-row grow bg-gray-50">
            <div className="lg:w-1/3 bg-white flex flex-col">
              <Tab.Group>
                <div className="h-full flex md:flex-row flex-col">
                  <Tab.List className="bg-white md:p-0 p-2 flex flex-row md:flex-col">
                    <Tab className="flex items-center font-semibold  ">
                      <svg
                        className="text-gray- bg-white w-12 m-2 h-12 p-2 rounded border"
                        fill="currentColor"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3 1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z" />
                      </svg>
                    </Tab>

                    <Tab className="flex items-center font-semibold text-lg">
                      <svg
                        className=" text-gray-800 bg-white w-12 h-12 p-2 m-2 rounded border"
                        fill="currentColor"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11.024 11.536 10 10l-2 3h9l-3.5-5z" />
                        <circle cx="9.503" cy="7.497" r="1.503" />
                        <path d="M19 2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.806 5 19s.55-.988 1.012-1H21V4c0-1.103-.897-2-2-2zm0 14H5V5c0-.806.55-.988 1-1h13v12z" />
                      </svg>
                    </Tab>
                  </Tab.List>

                  <Tab.Panels className="bg-white border-l w-full p-4">
                    <Tab.Panel>
                      <div className="m-2 flex flex-col">
                        <span className="font-medium pb-1">{t('editor.title')}</span>
                        <textarea
                          className="focus:outline-none border text-gray-700 text-xl rounded p-2 h-24"
                          placeholder={t('editor.title')}
                          type="text"
                          value={this.state.title}
                          onChange={(e) => this.setState({ title: e.target.value })}
                        />
                      </div>

                      <div className="flex flex-col m-2">
                        <span className="font-medium pb-1">{t('editor.author')}</span>
                        <input
                          className="focus:outline-none border text-gray-700 text-xl rounded bg-white p-2"
                          placeholder={t('editor.author')}
                          type="text"
                          value={this.state.author}
                          onChange={(e) => this.setState({ author: e.target.value })}
                        />
                      </div>

                      <div className="flex flex-col m-2">
                        <span className="font-medium pb-1">{t('editor.icon')}</span>
                        <Select
                          className="outline-none focus:outline-none text-xl text-gray-700"
                          formatOptionLabel={this.formatOptionLabel}
                          options={this.state.devIconOptions}
                          value={this.state.icon}
                          onChange={(selectedOption) => this.setState({
                            icon: selectedOption,
                            iconStyle: selectedOption.opts[0],
                            iconStyleOptions: selectedOption.opts,
                            customIcon: '',
                          })}
                        />
                      </div>

                      <div className={`flex items-center justify-center ${this.state.icon.value === 'custom' ? '' : 'hidden'}`}>
                        <input
                          className="focus:outline-none text-lg cursor-pointer bg-white rounded border m-2"
                          type="file"
                          onChange={(e) => this.setState({ customIcon: URL.createObjectURL(e.target.files[0]) })}
                        />
                      </div>

                      <div className="flex items-center">
                        <div className="flex flex-col m-2 w-1/2">
                          <span className="font-medium pb-1">{t('editor.font')}</span>
                          <select
                            className="focus:outline-none text-gray-700 text-xl p-2 rounded border"
                            value={this.state.font}
                            onChange={(e) => this.setState({ font: e.target.value })}
                          >
                            {
                              fontOptions.map((font) => (
                                <option key={font} value={font}>{font}</option>
                              ))
                            }
                          </select>
                        </div>
                        <div className="flex flex-col m-2 w-full">
                          <span className="font-medium pb-1">{t('editor.platform')}</span>
                          <select
                            className="focus:outline-none text-gray-700 text-xl p-2 rounded border"
                            value={this.state.platform}
                            onChange={this.handleSelectPlatform}
                          >
                            <option value="custom">{this.props.t('editor.custom')}</option>
                            {
                              platformOptions.map((platform) => (
                                <option key={platform.value} value={platform.value}>{platform.label}</option>
                              ))
                            }
                          </select>
                        </div>
                      </div>

                      <div className={`flex items-center justify-center ${this.state.platform === 'custom' ? '' : 'hidden'}`}>
                        <input
                          className="w-1/3 focus:outline-none border text-gray-700 text-xl rounded p-2 m-2"
                          min={500}
                          placeholder="width"
                          type="number"
                          value={this.state.customPlatformWidth}
                          onChange={(e) => this.setState({ customPlatformWidth: e.target.value })}
                        />
                        <input
                          className="w-1/3 focus:outline-none border text-gray-700 text-xl rounded p-2 m-2"
                          min={1}
                          placeholder="x"
                          type="number"
                          value={this.state.customPlatformX}
                          onChange={(e) => this.setState({ customPlatformX: e.target.value })}
                        />
                        :
                        <input
                          className="w-1/3 focus:outline-none border text-gray-700 text-xl rounded p-2 m-2"
                          min={1}
                          placeholder="y"
                          type="number"
                          value={this.state.customPlatformY}
                          onChange={(e) => this.setState({ customPlatformY: e.target.value })}
                        />
                      </div>

                      <div className={`flex items-center ${this.state.theme === 'background' ? 'hidden' : ''}`}>
                        <div className="flex flex-col m-2 w-1/2">
                          <span className="font-medium pb-1">{t('editor.color')}</span>
                          <div className="border rounded flex items-center p-2">
                            <span className="text-xl text-gray-700 mx-2">{this.state.bgColor}</span>
                            <input
                              className="h-8 w-8 ml-auto mr-1 rounded"
                              type="color"
                              value={this.state.bgColor}
                              onChange={(e) => this.setState({ bgColor: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col m-2 w-1/2">
                          <span className="font-medium pb-1">{t('editor.pattern')}</span>
                          <select
                            className="focus:outline-none border text-xl p-2 rounded"
                            value={this.state.pattern}
                            onChange={(e) => this.setState({ pattern: e.target.value })}
                          >
                            {patternOptions.map((item) => (<option key={item}>{item}</option>))}
                          </select>
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-2 md:gap-4 m-2">
                        <RandomTheme
                          className={this.state.theme === 'background' ? 'hidden' : ''}
                          onThemeChange={this.getRandomTheme}
                        />
                        <button
                          className="bg-gray-700 text-white rounded-lg text-lg font-semibold py-1 px-4 border"
                          onClick={this.handleReset}
                        >
                          <span>{t('editor.resetBtn')}</span>
                        </button>
                      </div>
                    </Tab.Panel>

                    <Tab.Panel className="h-full flex flex-col">
                      <div className="flex items-center justify-between border rounded-xl border-gray-50 px-4 py-2">
                        <h2 className="text-lg font-inter font-semibold">{t('editor.themes')}</h2>
                        <RandomTheme onThemeChange={this.getRandomTheme} />
                      </div>

                      <div className="h-full flex flex-wrap overflow-y-scroll">
                        {
                          themeOptions.map((theme) => (
                            <div
                              className={`${theme.name === 'background' ? 'w-full' : 'w-1/2'} p-2`}
                              key={theme.name}
                              title={theme.name}
                            >
                              <img
                                alt={theme.name}
                                className={`${this.state.theme === theme.name ? 'border-2 border-indigo-400 hover:border-indigo-500' : 'border border-gray-100 hover:border-gray-200'} cursor-pointer hover:scale-105 duration-300`}
                                src={theme.src}
                                onClick={(e) => this.setState({ theme: theme.name })}
                              />
                            </div>
                          ))
                        }
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </div>
              </Tab.Group>
            </div>

            <ComponentToImg>
              <CoverImage {...this.state} />
            </ComponentToImg>
          </div>
        </ImgProvider>

        {/* 额外引入的字体样式 */}
        {this._getFontStyle()}
        {/* 自定义平台尺寸样式 */}
        {this.state.platform === 'custom' && (
          <style>{`.custom { --cv-width: ${this.state.customPlatformWidth}px; --cv-platform-x: ${this.state.customPlatformX}; --cv-platform-y: ${this.state.customPlatformY};}`}</style>
        )}
      </div>
    )
  }
}

export default withTranslation()(Editor)
